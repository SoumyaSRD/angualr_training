import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostListener,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import type { SubTopic, Topic } from '@app/core';
import { AuthService, NavigationService, ThemeService } from '@app/core';
import { Login } from './components/auth/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
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
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  @ViewChild('drawer') drawer!: MatSidenav;

  private readonly router = inject(Router);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  readonly navigationService = inject(NavigationService);
  readonly themeService = inject(ThemeService);
  readonly authService = inject(AuthService);

  /** Responsive: true when handset/tablet portrait. */
  readonly isHandset = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.TabletPortrait]).pipe(
      map((result) => result.matches)
    ),
    { initialValue: false }
  );

  /** Current page title for breadcrumb. */
  readonly currentPageTitle = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.resolvePageTitle())
    ),
    { initialValue: this.resolvePageTitle() }
  );

  /** Icon color for toolbar (theme-aware). */
  readonly toolbarIconColor = computed(() =>
    this.themeService.isDarkSelected() ? '#ffffff' : '#000000'
  );

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  private resolvePageTitle(): string {
    const url = this.router.url;
    if (url === '/' || url === '/dashboard') return 'Dashboard';
    for (const topic of this.navigationService.topics) {
      const sub = topic.subTopics.find((s) => url.startsWith(s.route));
      if (sub) return sub.title;
      if (topic.subTopics.some((s) => url.includes(s.route))) return topic.title;
    }
    return 'Learning';
  }

  closeDrawerIfMobile(): void {
    if (this.isHandset() && this.drawer?.opened) {
      this.drawer.close();
    }
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

  logout(): void {
    this.authService.logout();
  }

  login(): void {
    this.dialog.open(Login, {
      width: '420px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: false,
      restoreFocus: true,
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.drawer?.opened && this.isHandset()) {
      this.drawer.close();
    }
  }
}
