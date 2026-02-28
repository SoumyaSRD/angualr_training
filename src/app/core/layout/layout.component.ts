import { CommonModule } from '@angular/common';
import {
    Component,
    HostListener,
    inject,
    signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';
import { FooterComponent } from './footer.component';
import { ModalService } from '../services/modal.service';
import { Login } from '../../components/auth/login/login';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterOutlet,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
    ],
    template: `
    <div class="layout-wrapper d-flex flex-column vh-100">
      <app-header (menuToggle)="toggleSidebar()"></app-header>

      <div class="layout-body d-flex flex-grow-1 overflow-hidden">
        <!-- Sidebar - Desktop: always visible, Mobile: offcanvas -->
        <aside
          class="sidebar"
          [class.sidebar-open]="isSidebarOpen()"
          [class.sidebar-mobile]="isMobile()"
        >
          <app-sidebar (itemSelected)="closeSidebarOnMobile()"></app-sidebar>
        </aside>

        <!-- Overlay for mobile -->
        @if (isMobile() && isSidebarOpen()) {
          <div class="sidebar-overlay" (click)="closeSidebar()"></div>
        }

        <!-- Main Content -->
        <main class="main-content flex-grow-1 d-flex flex-column overflow-hidden">
          <!-- Breadcrumb -->
          <nav aria-label="breadcrumb" class="breadcrumb-wrapper px-4 py-2">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <a routerLink="/" class="text-decoration-none">
                  <i class="bi bi-house-door"></i>
                </a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ currentPageTitle() }}
              </li>
            </ol>
          </nav>

          <!-- Page Content -->
          <div class="content-area flex-grow-1 overflow-auto p-4">
            <router-outlet></router-outlet>
          </div>

          <!-- Footer -->
          <app-footer></app-footer>
        </main>
      </div>

      <!-- Toast Container -->
      <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1080;">
        @for (toast of toastService.toasts(); track toast.id) {
          <div
            class="toast show align-items-center text-white bg-{{ toast.type }} border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="d-flex">
              <div class="toast-body">
                @if (toast.type === 'success') {
                  <i class="bi bi-check-circle-fill me-2"></i>
                } @else if (toast.type === 'error') {
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>
                } @else if (toast.type === 'warning') {
                  <i class="bi bi-exclamation-circle-fill me-2"></i>
                } @else {
                  <i class="bi bi-info-circle-fill me-2"></i>
                }
                {{ toast.message }}
              </div>
              @if (toast.dismissible) {
                <button
                  type="button"
                  class="btn-close btn-close-white me-2 m-auto"
                  (click)="toastService.dismiss(toast.id)"
                  aria-label="Close"
                ></button>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
    styles: [`
    .layout-wrapper {
      background: var(--background-color);
    }

    .layout-body {
      position: relative;
    }

    .sidebar {
      width: 280px;
      min-width: 280px;
      height: 100%;
      overflow-y: auto;
      transition: transform 0.3s ease;
      z-index: 1040;
    }

    .sidebar-mobile {
      position: fixed;
      left: 0;
      top: 56px; /* Height of navbar */
      bottom: 0;
      transform: translateX(-100%);
      box-shadow: var(--shadow-lg);
    }

    .sidebar-mobile.sidebar-open {
      transform: translateX(0);
    }

    .sidebar-overlay {
      position: fixed;
      top: 56px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1035;
    }

    .main-content {
      background: var(--background-color);
    }

    .breadcrumb-wrapper {
      background: var(--surface-color);
      border-bottom: 1px solid var(--border-color);
    }

    .breadcrumb {
      font-size: 0.875rem;
    }

    .breadcrumb-item a {
      color: var(--text-secondary);
      
      &:hover {
        color: var(--primary-color);
      }
    }

    .breadcrumb-item.active {
      color: var(--text-primary);
      font-weight: 500;
    }

    .content-area {
      scroll-behavior: smooth;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 260px;
        min-width: 260px;
      }
    }
  `],
})
export class LayoutComponent {
    private readonly router = inject(Router);
    private readonly modalService = inject(ModalService);
    readonly toastService = inject(ToastService);

    // Sidebar state
    readonly isSidebarOpen = signal(true);
    readonly isMobile = signal(window.innerWidth < 992);

    // Page title for breadcrumb
    readonly currentPageTitle = toSignal(
        this.router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            startWith(null),
            map(() => this.resolvePageTitle())
        ),
        { initialValue: this.resolvePageTitle() }
    );

    constructor() {
        // Handle initial sidebar state based on screen size
        this.updateSidebarState();

        // Listen for route changes to scroll to top
        this.router.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe(() => {
                const contentArea = document.querySelector('.content-area');
                if (contentArea) {
                    contentArea.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });

        // Listen for login event from header
        window.addEventListener('app:login', () => {
            this.openLogin();
        });
    }

    @HostListener('window:resize')
    onResize(): void {
        const isMobileNow = window.innerWidth < 992;
        this.isMobile.set(isMobileNow);
        this.updateSidebarState();
    }

    private updateSidebarState(): void {
        if (this.isMobile()) {
            this.isSidebarOpen.set(false);
        } else {
            this.isSidebarOpen.set(true);
        }
    }

    toggleSidebar(): void {
        this.isSidebarOpen.update((open) => !open);
    }

    closeSidebar(): void {
        this.isSidebarOpen.set(false);
    }

    closeSidebarOnMobile(): void {
        if (this.isMobile()) {
            this.closeSidebar();
        }
    }

    openLogin(): void {
        this.modalService.open(Login, {
            size: 'md',
            centered: true,
            backdrop: true,
            keyboard: true,
        });
    }

    private resolvePageTitle(): string {
        const url = this.router.url;
        if (url === '/' || url === '/dashboard') return 'Dashboard';
        // Extract title from URL path
        const segments = url.split('/').filter(Boolean);
        if (segments.length > 0) {
            const lastSegment = segments[segments.length - 1];
            return lastSegment
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        return 'Learning';
    }
}
