import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; // Added for better list styling (optional)
import { ICodeExample } from '../../interfaces/code-example';

// Define interfaces for the new inputs (you can move these to separate files if preferred)
export interface ISection {
  heading: string;
  content?: string;
  list?: string[];                // Supports HTML in items (e.g., <strong>Bold</strong>)
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
    MatListModule
  ],
  templateUrl: './topic-template.component.html',
  styleUrl: './topic-template.component.scss'
})
export class TopicTemplateComponent {
  @Input() title = '';
  @Input() tags: string[] = [];

  // Main introductory paragraphs (rendered as <p> tags)
  @Input() paragraphs: string[] = [];

  // Detailed sections with heading, content, list, and optional note
  @Input() sections: ISection[] = [];

  // Code examples (existing)
  @Input() codeExamples: ICodeExample[] = [];

  // Best practices (new)
  @Input() bestPractices: string[] = [];

  // Key takeaways (existing)
  @Input() keyPoints: string[] = [];
}