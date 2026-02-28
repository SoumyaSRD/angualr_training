import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import type { SubTopic, Topic } from '@app/core';
import { NavigationService } from '@app/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Output() itemSelected = new EventEmitter<void>();

  readonly navigationService = inject(NavigationService);
  private readonly router = inject(Router);

  onItemSelected(): void {
    this.itemSelected.emit();
  }

  isCompleted(route: string): boolean {
    const completedRoutes = ['/basics', '/components', '/services'];
    return completedRoutes.some((r) => route.includes(r));
  }

  isTopicExpanded(topic: Topic): boolean {
    return topic.subTopics.some((sub: SubTopic) =>
      this.router.url.includes(sub.route)
    );
  }
}

