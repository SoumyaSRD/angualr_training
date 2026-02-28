import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { NavigationService } from '@app/core';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly navigationService = inject(NavigationService);

  readonly searchTerm = signal('');
  readonly filteredTopics = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.navigationService.topics;

    return this.navigationService.topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(term) ||
        topic.subTopics.some((sub) => sub.title.toLowerCase().includes(term))
    );
  });
}