import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ICodeExample } from '../../interfaces/code-example';

export interface ISection {
  id?: string;
  heading: string;
  content?: string;
  list?: string[];
  additionalExplanation?: string;
}

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
  templateUrl: './topic-template.component.html',
  styleUrl: './topic-template.component.scss'
})
export class TopicTemplateComponent {
  @Input() title = '';
  @Input() tags: string[] = [];
  @Input() paragraphs: string[] = [];
  @Input() sections: ISection[] = [];
  @Input() codeExamples: ICodeExample[] = [];
  @Input() bestPractices: string[] = [];
  @Input() keyPoints: string[] = [];

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
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

  getSectionId(section: ISection, index: number): string {
    return section.id || `section-${this.sanitizeId(section.heading)}-${index}`;
  }

  private sanitizeId(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  getTagLink(tag: string): string | null {
    const tagLower = tag.toLowerCase();
    const matchingSection = this.sections.find(section =>
      section.heading.toLowerCase().includes(tagLower)
    );

    if (matchingSection) {
      const index = this.sections.indexOf(matchingSection);
      return this.getSectionId(matchingSection, index);
    }

    return null;
  }

  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard');
    });
  }
}
