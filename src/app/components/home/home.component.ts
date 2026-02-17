import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NavigationService, ThemeService } from '@app/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchTerm = signal('');
  themeService = inject(ThemeService);
  filteredTopics = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.navigationService.topics;

    return this.navigationService.topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(term) ||
        topic.subTopics.some((sub) =>
          sub.title.toLowerCase().includes(term)
        )
    );
  });

  readonly navigationService = inject(NavigationService);
}