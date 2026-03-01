import { CommonModule } from '@angular/common';
import {
    Component,
    ChangeDetectionStrategy,
    output,
    inject,
    signal,
    OnInit,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationService, type Topic } from '@app/core';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './sidebar.scss',
    template: `
        <aside
            class="sidebar"
            [class.collapsed]="isCollapsed()"
            [class.mobile-open]="isMobileOpen()"
        >
            <!-- ── Logo ──────────────────────────────────────────── -->
            <div class="sidebar-logo">
                <a class="logo-link" routerLink="/">
                    <div class="logo-icon">
                        <i class="bi bi-code-square"></i>
                    </div>
                    @if (!isCollapsed()) {
                        <span class="logo-text">Angular</span>
                    }
                </a>
            </div>

            <!-- ── Main Nav ──────────────────────────────────────── -->
            <nav class="sidebar-nav">

                <!-- Dashboard -->
                <a
                    class="nav-link"
                    routerLink="/"
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: true }"
                    (click)="onItemClick()"
                >
                    <div class="nav-icon"><i class="bi bi-grid-fill"></i></div>
                    @if (!isCollapsed()) {
                        <span class="nav-label">Dashboard</span>
                    }
                </a>

                <!-- Topics -->
                @for (topic of navigationService.topics; track topic.title) {
                    <div class="nav-group" [attr.data-topic]="topic.title">

                        @if (!isCollapsed()) {
                            <!-- Expanded: label + collapsible submenu -->
                            <button
                                class="nav-link nav-group-toggle"
                                (click)="toggleTopic(topic.title); navigateToFirstSubtopic(topic)"
                                [class.expanded]="isTopicExpanded(topic.title)"
                            >
                                <div class="nav-icon">
                                    <i class="{{ topic.icon }}"></i>
                                </div>
                                <span class="nav-label">{{ topic.title }}</span>
                                <i class="bi bi-chevron-right arrow-icon"></i>
                            </button>

                            @if (isTopicExpanded(topic.title)) {
                                <div class="submenu">
                                    @for (sub of topic.subTopics; track sub.route) {
                                        <a
                                            class="submenu-link"
                                            [routerLink]="sub.route"
                                            routerLinkActive="active"
                                            (click)="onItemClick()"
                                        >
                                            <div class="submenu-icon">
                                                <i class="bi bi-chevron-right"></i>
                                            </div>
                                            <span class="submenu-text">{{ sub.title }}</span>
                                            <div class="submenu-arrow">
                                                <i class="bi bi-arrow-right-short"></i>
                                            </div>
                                        </a>
                                    }
                                </div>
                            }

                        } @else {
                            <!-- Collapsed: icon-only with click to navigate + hover tooltip -->
                            <a
                                class="nav-link"
                                [routerLink]="topic.subTopics[0]?.route"
                                routerLinkActive="active"
                                (mouseenter)="showTooltip(topic, $event)"
                                (mouseleave)="hideTooltip()"
                                (click)="onItemClick()"
                            >
                                <div class="nav-icon">
                                    <i class="{{ topic.icon }}"></i>
                                </div>
                                <!-- Tooltip title on hover -->
                                <div class="nav-tooltip-title">{{ topic.title }}</div>
                            </a>
                        }

                    </div>
                }
            </nav>

            <!-- ── Footer ───────────────────────────────────────── -->
            <div class="sidebar-footer">
                <button class="nav-link" (click)="toggleCollapse()">
                    <div class="nav-icon">
                        <i
                            class="bi"
                            [class.bi-chevron-double-left]="!isCollapsed()"
                            [class.bi-chevron-double-right]="isCollapsed()"
                        ></i>
                    </div>
                    @if (!isCollapsed()) {
                        <span class="nav-label">Collapse</span>
                    }
                </button>
            </div>

            <!-- ── Collapsed Tooltip ─────────────────────────────── -->
            @if (activeTooltip() && isCollapsed()) {
                <div
                    class="nav-tooltip"
                    [style.top.px]="tooltipPosition().top"
                    [style.left.px]="tooltipPosition().left"
                    (mouseenter)="onTooltipEnter()"
                    (mouseleave)="hideTooltip()"
                >
                    <div class="tooltip-header">
                        <div class="tooltip-icon">
                            <i class="{{ activeTooltip()!.icon }}"></i>
                        </div>
                        <span class="tooltip-title">{{ activeTooltip()!.title }}</span>
                    </div>
                    <div class="tooltip-content">
                        @for (sub of activeTooltip()!.subTopics; track sub.route) {
                            <a
                                class="tooltip-item"
                                [routerLink]="sub.route"
                                (click)="onTooltipItemClick()"
                            >
                                <i class="bi bi-circle-fill tooltip-dot"></i>
                                <span>{{ sub.title }}</span>
                            </a>
                        }
                    </div>
                    <div class="tooltip-footer">
                        <a
                            class="tooltip-view-all"
                            [routerLink]="activeTooltip()!.subTopics[0]?.route"
                            (click)="onTooltipItemClick()"
                        >
                            <span>View Topic</span>
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            }
        </aside>

        <!-- Mobile backdrop -->
        @if (isMobileOpen()) {
            <div class="sidebar-overlay" (click)="closeMobile()"></div>
        }
    `,
})
export class SidebarComponent implements OnInit {
    readonly navigationService = inject(NavigationService);
    readonly router = inject(Router);

    // ── State signals ────────────────────────────────────────────────────────
    readonly isCollapsed = signal(false);
    readonly isMobileOpen = signal(false);
    readonly expandedTopics = signal<Set<string>>(new Set());

    // ── Tooltip state ────────────────────────────────────────────────────────
    readonly activeTooltip = signal<Topic | null>(null);
    readonly tooltipPosition = signal<{ top: number; left: number }>({ top: 0, left: 0 });

    /**
     * Separate timers so mouseenter on the tooltip itself cancels the
     * "mouse left the nav item" hide, preventing flicker.
     */
    private hideTimer: ReturnType<typeof setTimeout> | null = null;

    // ── Outputs ──────────────────────────────────────────────────────────────
    readonly itemSelected = output<void>();
    readonly collapseChanged = output<boolean>();

    // ── Lifecycle ────────────────────────────────────────────────────────────

    ngOnInit(): void {
        // Listen to route changes and expand the corresponding topic
        this.router.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe((event) => {
                this.expandTopicForRoute(event.url);
            });
    }

    // ── Topic expansion based on route ───────────────────────────────────────

    private expandTopicForRoute(url: string): void {
        // Find which topic contains the current route
        for (const topic of this.navigationService.topics) {
            const hasMatchingSubtopic = topic.subTopics.some(sub =>
                url.startsWith(sub.route) || sub.route === url
            );
            if (hasMatchingSubtopic) {
                this.expandedTopics.update(set => {
                    const next = new Set(set);
                    next.add(topic.title);
                    return next;
                });
                // Scroll to the topic after a short delay to allow rendering
                setTimeout(() => this.scrollToTopic(topic.title), 100);
                break;
            }
        }
    }

    private scrollToTopic(topicTitle: string): void {
        const topicElement = document.querySelector(`[data-topic="${topicTitle}"]`);
        if (topicElement) {
            topicElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // ── Toggle / expand ──────────────────────────────────────────────────────

    toggleCollapse(): void {
        this.isCollapsed.update(v => !v);
        this.collapseChanged.emit(this.isCollapsed());
        // Clear any open tooltip when collapsing
        if (!this.isCollapsed()) this.activeTooltip.set(null);
    }

    toggleTopic(title: string): void {
        this.expandedTopics.update(set => {
            const next = new Set(set);
            next.has(title) ? next.delete(title) : next.add(title);
            return next;
        });
    }

    isTopicExpanded(title: string): boolean {
        return this.expandedTopics().has(title);
    }

    // ── Tooltip ──────────────────────────────────────────────────────────────

    showTooltip(topic: Topic, event: MouseEvent): void {
        this._clearHideTimer();

        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        this.tooltipPosition.set({ top: rect.top, left: rect.right + 10 });
        this.activeTooltip.set(topic);
    }

    /** Called when the mouse enters the tooltip panel itself — cancel hide. */
    onTooltipEnter(): void {
        this._clearHideTimer();
    }

    hideTooltip(): void {
        this.hideTimer = setTimeout(() => this.activeTooltip.set(null), 160);
    }

    private _clearHideTimer(): void {
        if (this.hideTimer !== null) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
    }

    // ── Click handlers ───────────────────────────────────────────────────────

    onTooltipItemClick(): void {
        this.activeTooltip.set(null);
        this.onItemClick();
    }

    onItemClick(): void {
        this.itemSelected.emit();
        if (window.innerWidth < 992) this.isMobileOpen.set(false);
    }

    closeMobile(): void { this.isMobileOpen.set(false); }
    openMobile(): void { this.isMobileOpen.set(true); }

    navigateToFirstSubtopic(topic: Topic): void {
        if (topic.subTopics.length > 0) {
            this.router.navigate([topic.subTopics[0].route]);
        }
    }
}