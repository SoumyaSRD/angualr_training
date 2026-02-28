import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, ThemeService } from '@app/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <nav class="navbar navbar-expand-lg sticky-top">
      <div class="container-fluid">
        <!-- Left: Menu Toggle + Brand -->
        <div class="d-flex align-items-center">
          <button
            class="btn btn-link text-decoration-none me-2"
            (click)="onToggleMenu()"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list fs-4"></i>
          </button>

          <a class="navbar-brand d-flex align-items-center" routerLink="/">
            <i class="bi bi-code-square me-2 fs-4"></i>
            <div class="d-flex flex-column">
              <span class="fw-bold">Angular Academy</span>
              <small class="text-muted d-none d-md-block" style="font-size: 0.7rem; margin-top: -4px;">Professional Training</small>
            </div>
          </a>
        </div>

        <!-- Right: Theme + User -->
        <div class="d-flex align-items-center gap-2">
          <!-- Theme Dropdown -->
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-palette"></i>
              <span class="d-none d-md-inline">{{ themeService.currentTheme() | titlecase }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              @for (theme of themeService.themes; track theme) {
                <li>
                  <button
                    class="dropdown-item d-flex align-items-center gap-2"
                    (click)="themeService.setTheme(theme)"
                  >
                    @if (themeService.currentTheme() === theme) {
                      <i class="bi bi-check-lg text-primary"></i>
                    } @else {
                      <span style="width: 1rem;"></span>
                    }
                    {{ theme | titlecase }}
                  </button>
                </li>
              }
            </ul>
          </div>

          <!-- User Dropdown -->
          <div class="dropdown">
            <button
              class="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle"></i>
              <span class="d-none d-md-inline">{{ authService.username() }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <span class="dropdown-item-text text-muted">
                  <i class="bi bi-person me-2"></i>User
                </span>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item" routerLink="/profile">
                  <i class="bi bi-gear me-2"></i>Profile & Settings
                </a>
              </li>
              @if (authService.isLoggedIn()) {
                <li>
                  <button class="dropdown-item" (click)="logout()">
                    <i class="bi bi-box-arrow-right me-2"></i>Sign out
                  </button>
                </li>
              } @else {
                <li>
                  <button class="dropdown-item" (click)="login()">
                    <i class="bi bi-box-arrow-in-right me-2"></i>Sign in
                  </button>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `,
    styles: [`
    .navbar {
      background: var(--surface-gradient);
      border-bottom: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      padding: 0.5rem 1rem;
    }

    .navbar-brand {
      color: var(--text-primary);
      font-size: 1.1rem;
      
      &:hover {
        color: var(--primary-color);
      }
    }

    .btn-link {
      color: var(--text-primary);
      padding: 0.25rem;
      
      &:hover {
        color: var(--primary-color);
      }
    }
  `]
})
export class HeaderComponent {
    @Output() menuToggle = new EventEmitter<void>();

    readonly themeService = inject(ThemeService);
    readonly authService = inject(AuthService);

    onToggleMenu(): void {
        this.menuToggle.emit();
    }

    logout(): void {
        this.authService.logout();
    }

    login(): void {
        // Emit a custom event for login that parent can handle
        this.menuToggle.emit();
        // Also emit login event
        const loginEvent = new CustomEvent('app:login');
        window.dispatchEvent(loginEvent);
    }
}
