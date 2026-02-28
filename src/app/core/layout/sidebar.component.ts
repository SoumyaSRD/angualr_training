import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService, type Topic, type SubTopic } from '@app/core';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    template: `
    <div class="sidebar-content h-100 d-flex flex-column">
      <div class="accordion accordion-flush flex-grow-1" id="sidebarAccordion">
        @for (topic of navigationService.topics; track topic.title; let i = $index) {
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                [class.collapsed]="!isTopicExpanded(topic)"
                type="button"
                data-bs-toggle="collapse"
                [attr.data-bs-target]="'#collapse' + i"
                [attr.aria-expanded]="isTopicExpanded(topic)"
              >
                <i class="bi me-2" [class]="getTopicIcon(topic)"></i>
                <span>{{ topic.title }}</span>
              </button>
            </h2>
            <div
              [id]="'collapse' + i"
              class="accordion-collapse collapse"
              [class.show]="isTopicExpanded(topic)"
              data-bs-parent="#sidebarAccordion"
            >
              <div class="accordion-body p-0">
                <div class="list-group list-group-flush">
                  @for (sub of topic.subTopics; track sub.route) {
                    <a
                      [routerLink]="sub.route"
                      routerLinkActive="active"
                      [routerLinkActiveOptions]="{ exact: true }"
                      (click)="onItemSelected()"
                      class="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                    >
                      <span class="d-flex align-items-center">
                        <i class="bi bi-chevron-right me-2 small"></i>
                        {{ sub.title }}
                      </span>
                      @if (isCompleted(sub.route)) {
                        <i class="bi bi-check-circle-fill text-success"></i>
                      }
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
    styles: [`
    .sidebar-content {
      background: var(--surface-color);
      border-right: 1px solid var(--border-color);
    }

    .accordion-item {
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--border-color-light);
    }

    .accordion-button {
      background: var(--surface-gradient);
      color: var(--text-primary);
      font-weight: 600;
      padding: 1rem;
      font-size: 0.9rem;
      
      &:not(.collapsed) {
        background: var(--surface-variant);
        color: var(--primary-color);
        box-shadow: none;
      }
      
      &:focus {
        box-shadow: none;
        border-color: var(--primary-color);
      }
      
      &::after {
        filter: invert(0.5);
        width: 0.8rem;
        height: 0.8rem;
        background-size: 0.8rem;
      }
    }

    .accordion-body {
      background: var(--background-color);
    }

    .list-group-item {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
      border-left: 3px solid transparent;
      
      &:hover {
        background: var(--surface-variant);
        color: var(--text-primary);
      }
      
      &.active {
        background: transparent;
        color: var(--primary-color);
        border-left-color: var(--primary-color);
        font-weight: 500;
      }
    }
  `]
})
export class SidebarComponent {
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

    getTopicIcon(topic: Topic): string {
        // Map topic titles to Bootstrap icons
        const iconMap: Record<string, string> = {
            'Prerequisites': 'bi-journal-text',
            'Angular Fundamentals': 'bi-angular',
            'Core Building Blocks': 'bi-boxes',
            'Templates & UI': 'bi-layout-text-window',
            'Services & DI': 'bi-gear',
            'Routing & Decorators': 'bi-signpost',
            'Forms': 'bi-input-cursor-text',
            'RxJS & HTTP': 'bi-arrow-repeat',
        };
        return iconMap[topic.title] || 'bi-folder';
    }
}
