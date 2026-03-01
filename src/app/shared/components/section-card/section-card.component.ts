import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';

type SectionCardVariant = 'default' | 'accent' | 'glass';

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionCardComponent {
  /** Main title of the card. */
  readonly title = input.required<string>();

  /** Optional short description under the title. */
  readonly subtitle = input<string>();

  /** Optional small badge in the top-right corner (e.g. "New", "Core"). */
  readonly badge = input<string>();

  /**
   * Bootstrap Icon class string to display left of the title.
   * Pass the full class e.g. "bi bi-boxes" — rendered as <i class="...">
   */
  readonly icon = input<string>();

  /** Visual variant of the card. Defaults to 'default'. */
  readonly variant = input<SectionCardVariant>('default');

  /** Optional route to navigate to when card is clicked. */
  readonly route = input<string>();
}