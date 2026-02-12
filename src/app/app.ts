import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { NavigationService } from './services/navigation.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDividerModule,
    MatMenuModule,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;

  private destroy$ = new Subject<void>();

  // Injected services
  public navigationService = inject(NavigationService);
  public themeService = inject(ThemeService);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  // Signals
  isHandset = signal(false);
  currentPageTitle = signal<string>('Dashboard');

  constructor() {
    // Responsive detection
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => this.isHandset.set(result.matches));

    // Route change listener
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle();
      }
    });
    this.router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle();
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    // Initial title
    this.updatePageTitle();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ─── Navigation / Drawer ────────────────────────────────────────
  closeDrawerIfMobile() {
    if (this.isHandset()) {
      this.drawer.close();
    }
  }


  // ─── Page Title / Breadcrumb ────────────────────────────────────
  private updatePageTitle() {
    const url = this.router.url;

    if (url === '/' || url === '/dashboard') {
      this.currentPageTitle.set('Dashboard');
      return;
    }

    for (const topic of this.navigationService.topics) {
      const sub = topic.subTopics.find((s: any) => url.startsWith(s.route));
      if (sub) {
        this.currentPageTitle.set(sub.title);
        return;
      }
      if (topic.subTopics.some((s: any) => url.includes(s.route))) {
        this.currentPageTitle.set(topic.title);
        return;
      }
    }

    this.currentPageTitle.set('Learning');
  }
  isCompleted(route: string): boolean {
    const completedRoutes = ['/basics', '/components', '/services'];
    return completedRoutes.some(r => route.includes(r));
  }
  logout() {
    localStorage.clear();
  }
  isTopicExpanded(topic: any): boolean {
    return topic.subTopics.some((sub: any) => {
      const isActive = this.router.url.includes(sub.route);
      // Add animation delay for child items
      if (isActive) {
        setTimeout(() => {
          this.updatePageTitle();
        }, 100);
      }
      return isActive;
    });
  }

  // Add keyboard navigation support
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Close drawer on Escape key
    if (event.key === 'Escape' && this.drawer.opened && this.isHandset()) {
      this.drawer.close();
    }
  }

}