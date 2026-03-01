import { Injectable, signal, computed, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export interface BreadcrumbItem {
    label: string;
    url: string;
    icon?: string;
}

export interface PageMeta {
    title: string;
    description?: string;
    icon?: string;
    breadcrumbs: BreadcrumbItem[];
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);

    // Sidebar state
    private readonly sidebarOpenSignal = signal(true);
    readonly sidebarOpen = computed(() => this.sidebarOpenSignal());

    // Mobile detection
    private readonly isMobileSignal = signal(window.innerWidth < 992);
    readonly isMobile = computed(() => this.isMobileSignal());

    // Page meta from route data
    readonly pageMeta = toSignal(
        this.router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            startWith(null),
            map(() => this.buildPageMeta())
        ),
        { initialValue: this.buildPageMeta() }
    );

    // Breadcrumbs computed from page meta
    readonly breadcrumbs = computed(() => this.pageMeta().breadcrumbs);

    // Page title
    readonly pageTitle = computed(() => this.pageMeta().title);

    constructor() {
        // Listen for window resize
        window.addEventListener('resize', () => {
            const isMobile = window.innerWidth < 992;
            this.isMobileSignal.set(isMobile);

            // Auto-close sidebar on mobile
            if (isMobile) {
                this.sidebarOpenSignal.set(false);
            } else {
                this.sidebarOpenSignal.set(true);
            }
        });

        // Initialize sidebar state
        this.updateSidebarState();
    }

    /**
     * Toggle sidebar open/closed
     */
    toggleSidebar(): void {
        this.sidebarOpenSignal.update((open) => !open);
    }

    /**
     * Open sidebar
     */
    openSidebar(): void {
        this.sidebarOpenSignal.set(true);
    }

    /**
     * Close sidebar
     */
    closeSidebar(): void {
        this.sidebarOpenSignal.set(false);
    }

    /**
     * Close sidebar only on mobile
     */
    closeSidebarOnMobile(): void {
        if (this.isMobileSignal()) {
            this.closeSidebar();
        }
    }

    /**
     * Set page title manually
     */
    setPageTitle(title: string): void {
        document.title = `${title} | Angular Academy`;
    }

    /**
     * Build page metadata from current route
     */
    private buildPageMeta(): PageMeta {
        const url = this.router.url;
        const routeData = this.getRouteData();

        const breadcrumbs = this.buildBreadcrumbs(url, routeData);
        const title = (routeData?.['title'] as string) || this.generateTitleFromUrl(url);

        // Update document title
        this.setPageTitle(title);

        return {
            title,
            description: routeData?.['description'] as string | undefined,
            icon: routeData?.['icon'] as string | undefined,
            breadcrumbs,
        };
    }

    /**
     * Get route data from current route tree
     */
    private getRouteData(): Record<string, unknown> | null {
        let route = this.activatedRoute.root;
        let data: Record<string, unknown> = {};

        while (route.firstChild) {
            route = route.firstChild;
            data = { ...data, ...route.snapshot.data };
        }

        return Object.keys(data).length > 0 ? data : null;
    }

    /**
     * Build breadcrumb items from URL
     */
    private buildBreadcrumbs(url: string, routeData: Record<string, unknown> | null): BreadcrumbItem[] {
        const breadcrumbs: BreadcrumbItem[] = [
            { label: 'Home', url: '/', icon: 'bi-house-door' }
        ];

        if (url === '/') {
            return breadcrumbs;
        }

        const segments = url.split('/').filter(Boolean);
        let currentPath = '';

        // Build breadcrumbs from URL segments
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            currentPath += `/${segment}`;

            // Check if this is the last segment (current page)
            const isLast = i === segments.length - 1;

            // Use custom breadcrumb label from route data if available
            let label = this.formatSegmentLabel(segment);

            // Check for custom breadcrumb in route data
            const customBreadcrumbs = routeData?.['breadcrumbs'] as BreadcrumbItem[] | undefined;
            if (customBreadcrumbs && customBreadcrumbs[i]) {
                label = customBreadcrumbs[i].label;
            }

            breadcrumbs.push({
                label,
                url: isLast ? '' : currentPath, // Empty URL for current page
            });
        }

        return breadcrumbs;
    }

    /**
     * Format URL segment into readable label
     */
    private formatSegmentLabel(segment: string): string {
        return segment
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Generate page title from URL
     */
    private generateTitleFromUrl(url: string): string {
        if (url === '/' || url === '/dashboard') return 'Dashboard';

        const segments = url.split('/').filter(Boolean);
        if (segments.length > 0) {
            return this.formatSegmentLabel(segments[segments.length - 1]);
        }

        return 'Learning';
    }

    /**
     * Update sidebar state based on screen size
     */
    private updateSidebarState(): void {
        const isMobile = window.innerWidth < 992;
        this.isMobileSignal.set(isMobile);
        this.sidebarOpenSignal.set(!isMobile);
    }
}
