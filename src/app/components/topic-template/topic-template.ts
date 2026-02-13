import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ICodeExample } from '../../interfaces/code-example';
import { ISection } from '../../interfaces/topic';
import { ThemeService } from '../../services/theme.service';
@Component({
  selector: 'app-topic-template',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './topic-template.html',
  styleUrl: './topic-template.scss'
})
export class TopicTemplate {
  title = input('');
  tags = input<string[]>([]);
  paragraphs = input<string[]>([]);
  sections = input<ISection[]>([]);
  codeExamples = input<ICodeExample[]>([]);
  bestPractices = input<string[]>([]);
  keyPoints = input<string[]>([]);
  themeService = inject(ThemeService);
  readonly targetElement = viewChild<ElementRef<HTMLDivElement>>('scrollTopRef');
  private snackBar = inject(MatSnackBar);

  // State signals
  expandedCodeIndex = signal<number | null>(null);
  copiedCodeIndex = signal<number | null>(null);
  scrolled = signal(true);
  currentSectionIndex = signal(0);

  // REMOVE ['$event'] from here
  constructor() {
    effect(() => {
      // This side effect runs whenever `this.count()` changes
      console.log(`The current count is: ${this.title()}`);
      if (this.title()) {
        this.scrollToSection();
      }
    });
  }

  onWindowScroll(event: any) {
    this.scrolled.set(window.scrollY > 300);

    const sections = this.sections();
    if (sections.length > 0) {
      let currentIndex = 0;
      let maxIntersection = 0;

      sections.forEach((section, index) => {
        const element = document.getElementById(this.getSectionId(section, index));
        if (element) {
          const rect = element.getBoundingClientRect();
          // Calculation of how much of the section is visible in the viewport
          const intersection = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          if (intersection > maxIntersection) {
            maxIntersection = intersection;
            currentIndex = index;
          }
        }
      });

      this.currentSectionIndex.set(currentIndex);
    }
  }

  scrollToSection(): void {
    const element = this.targetElement()?.nativeElement;
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });

      element.classList.add('highlight-section');
      setTimeout(() => {
        element.classList.remove('highlight-section');
      }, 2000);
    }
  }

  scrollToTag(tag: string): void {
    const sectionId = this.getTagLink(tag);
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });

        // Add highlight animation
        element.classList.add('section-highlight');
        setTimeout(() => {
          element.classList.remove('section-highlight');
        }, 2000);
      }
    }
  }

  getSectionId(section: ISection | any, index: number): string {
    return section.id || `section-${this.sanitizeId(section?.heading)}-${index}`;
  }

  private sanitizeId(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  getTagLink(tag: string): string | null {
    const tagLower = tag.toLowerCase();
    const matchingSection = this.sections().find((section: ISection) =>
      section?.heading?.toLowerCase()?.includes(tagLower)
    );

    if (matchingSection) {
      const index = this.sections().indexOf(matchingSection);
      return this.getSectionId(matchingSection, index);
    }

    return null;
  }

  copyCode(code: string, index: number): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedCodeIndex.set(index);
      this.snackBar.open('Code copied to clipboard!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      setTimeout(() => {
        this.copiedCodeIndex.set(null);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
      this.snackBar.open('Failed to copy code', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    });
  }

  isCopied(index: number): boolean {
    return this.copiedCodeIndex() === index;
  }

  isExpanded(index: number): boolean {
    return this.expandedCodeIndex() === index;
  }

  toggleCodeExpansion(index: number): void {
    this.expandedCodeIndex.set(this.expandedCodeIndex() === index ? null : index);
  }

  calculateReadTime(): number {
    const contentLength = [
      ...this.paragraphs(),
      ...this.sections().map(s => s.content || ''),
      ...this.sections().flatMap(s => s.list || []),
      ...this.bestPractices(),
      ...this.keyPoints()
    ].join(' ').length;

    const words = contentLength / 5;
    const minutes = Math.ceil(words / 200);
    return Math.max(1, minutes);
  }

  countCodeLines(code: string): number {
    return code.split('\n').length;
  }

  calculateProgress(): number {
    const totalSections = this.sections().length;
    if (totalSections === 0) return 0;

    const currentIndex = this.currentSectionIndex();
    return Math.round(((currentIndex + 1) / totalSections) * 100);
  }

  getCurrentSection(): number {
    return this.currentSectionIndex() + 1;
  }

  getTotalSections(): number {
    return this.sections().length;
  }

  hasPreviousSection(): boolean {
    return this.currentSectionIndex() > 0;
  }

  hasNextSection(): boolean {
    return this.currentSectionIndex() < this.sections().length - 1;
  }

  navigateToPrevious(): void {
    if (this.hasPreviousSection()) {
      const prevIndex = this.currentSectionIndex() - 1;
      const section = this.sections()[prevIndex];
      const element = document.getElementById(this.getSectionId(section, prevIndex));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  navigateToNext(): void {
    if (this.hasNextSection()) {
      const nextIndex = this.currentSectionIndex() + 1;
      const section = this.sections()[nextIndex];
      const element = document.getElementById(this.getSectionId(section, nextIndex));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }



  isSectionHighlighted(heading: string): boolean {
    const tagLower = heading.toLowerCase();
    return this.tags().some(tag => tag.toLowerCase() === tagLower);
  }

  executeCode(example: ICodeExample): void {
    this.snackBar.open(`Running "${example.title}"...`, 'Close', {
      duration: 2000,
      panelClass: ['info-snackbar']
    });
    // In a real application, you would execute the code here
    // This is a placeholder for actual code execution logic
    console.log('Executing code:', example.code);
  }

  showBestPracticesTips(): void {
    this.snackBar.open('Opening best practices guide...', 'Close', {
      duration: 2000
    });
  }

  downloadKeyPoints(): void {
    const content = this.keyPoints().map((point, index) =>
      `${index + 1}. ${point}`
    ).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'key-points-summary.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}