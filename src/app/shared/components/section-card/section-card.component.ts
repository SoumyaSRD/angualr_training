import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type SectionCardVariant = 'default' | 'accent' | 'glass';

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
  /** Main title of the card. */
  @Input({ required: true }) title!: string;

  /** Optional short description under the title. */
  @Input() subtitle?: string;

  /** Optional small badge in the top-right corner (e.g. "New", "Core"). */
  @Input() badge?: string;

  /** Optional icon name (Material icon) to display to the left of the title. */
  @Input() icon?: string;

  /** Visual variant of the card. */
  @Input() variant: SectionCardVariant = 'default';
}

