import { CommonModule } from '@angular/common';
import {
    Component,
    ChangeDetectionStrategy,
    HostListener,
    inject,
    signal,
    viewChild,
    OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';
import { FooterComponent } from './footer.component';
import { ChatbotComponent } from '@app/shared';
import { ModalService } from '../services/modal.service';
import { ToastService } from '../services/toast.service';
import { Login } from '../../components/auth/login/login';

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
        ChatbotComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './layout.scss',
    template: `
        <div class="app-layout">

            <!-- ── Sidebar ──────────────────────────────────────── -->
            <app-sidebar
                #sidebar
                (itemSelected)="onSidebarItemSelected()"
                (collapseChanged)="onSidebarCollapse($event)"
            ></app-sidebar>

            <!-- ── Main Content ──────────────────────────────────── -->
            <main
                class="main-content"
                [class.sidebar-collapsed]="isSidebarCollapsed()"
            >
                <!-- Header -->
                <app-header (menuToggle)="onMenuToggle()"></app-header>

                <!-- Breadcrumb -->
                <nav aria-label="breadcrumb" class="breadcrumb-nav">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a routerLink="/" aria-label="Home">
                                <i class="bi bi-house-door-fill"></i>
                            </a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            {{ currentPageTitle() }}
                        </li>
                    </ol>
                </nav>

                <!-- Page Content -->
                <div class="content-wrapper">
                    <router-outlet></router-outlet>
                </div>

                <!-- Footer -->
                <app-footer></app-footer>
            </main>

            <!-- ── Toast Container ──────────────────────────────── -->
            <div class="toast-container" aria-live="polite" aria-atomic="false">
                @for (toast of toastService.toasts(); track toast.id) {
                    <div
                        class="glass-toast"
                        [class.toast-success]="toast.type === 'success'"
                        [class.toast-error]="toast.type === 'error'"
                        [class.toast-warning]="toast.type === 'warning'"
                        [class.toast-info]="toast.type === 'info'"
                        role="alert"
                    >
                        <!-- Icon -->
                        <div class="toast-icon">
                            @switch (toast.type) {
                                @case ('success') { <i class="bi bi-check-circle-fill"></i> }
                                @case ('error')   { <i class="bi bi-x-circle-fill"></i> }
                                @case ('warning') { <i class="bi bi-exclamation-triangle-fill"></i> }
                                @default          { <i class="bi bi-info-circle-fill"></i> }
                            }
                        </div>

                        <!-- Message -->
                        <div class="toast-content">
                            <div class="toast-message">{{ toast.message }}</div>
                        </div>

                        <!-- Dismiss -->
                        @if (toast.dismissible) {
                            <button
                                class="toast-close"
                                (click)="toastService.dismiss(toast.id)"
                                aria-label="Dismiss notification"
                            >
                                <i class="bi bi-x"></i>
                            </button>
                        }
                    </div>
                }
            </div>

        </div>

        <!-- Chatbot -->
        <app-chatbot></app-chatbot>
    `,
})
export class LayoutComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly modalService = inject(ModalService);
    readonly toastService = inject(ToastService);

    readonly sidebar = viewChild<SidebarComponent>('sidebar');

    // ── State ────────────────────────────────────────────────────────────────
    readonly isSidebarCollapsed = signal(false);
    readonly isMobile = signal(window.innerWidth < 992);

    // ── Breadcrumb title ─────────────────────────────────────────────────────
    readonly currentPageTitle = toSignal(
        this.router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            startWith(null),
            map(() => this.resolvePageTitle()),
        ),
        { initialValue: this.resolvePageTitle() },
    );

    // ── Lifecycle ────────────────────────────────────────────────────────────

    ngOnInit(): void {
        // Global login event (fired from HeaderComponent or elsewhere)
        window.addEventListener('app:login', () => this.openLogin());

        // Scroll to top on each navigation
        this.router.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe(() => {
                document
                    .querySelector('.content-wrapper')
                    ?.scrollTo({ top: 0, behavior: 'smooth' });
            });
    }

    // ── Host listeners ───────────────────────────────────────────────────────

    @HostListener('window:resize')
    onResize(): void {
        this.isMobile.set(window.innerWidth < 992);
    }

    // ── Sidebar handlers ─────────────────────────────────────────────────────

    onMenuToggle(): void {
        const sidebar = this.sidebar();
        if (!sidebar) return;

        if (this.isMobile()) {
            sidebar.openMobile();
        } else {
            sidebar.toggleCollapse();
        }
    }

    onSidebarCollapse(collapsed: boolean): void {
        this.isSidebarCollapsed.set(collapsed);
    }

    onSidebarItemSelected(): void {
        if (this.isMobile()) {
            this.sidebar()?.closeMobile();
        }
    }

    // ── Modal ─────────────────────────────────────────────────────────────────

    openLogin(): void {
        this.modalService.open(Login, {
            size: 'md',
            centered: true,
            backdrop: true,
            keyboard: true,
        });
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private resolvePageTitle(): string {
        const url = this.router.url;

        if (url === '/' || url === '/dashboard') return 'Dashboard';

        const segments = url.split('/').filter(Boolean);
        if (segments.length === 0) return 'Learning';

        return segments[segments.length - 1]
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}