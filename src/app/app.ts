import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from './services/navigation.service';
import { ThemeService } from './services/theme.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
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
    MatMenuModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;
  isMobile = false;
  currentRoute = '';
  progress = 0;
  completedLessons = 12;
  totalLessons = 36;

  private routerSubscription: Subscription;

  themeService = inject(ThemeService);

  constructor(
    public navigationService: NavigationService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    this.routerSubscription = this.router.events.subscribe(() => {
      this.updateCurrentRoute();
      this.calculateProgress();
    });
  }

  ngOnInit() {
    this.calculateProgress();
    this.updateCurrentRoute();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onNavClick() {
    if (this.isMobile) {
      this.drawer.close();
    }
  }

  isTopicActive(topic: any): boolean {
    return topic.subTopics.some((subTopic: any) =>
      this.isRouteActive(subTopic.route)
    );
  }

  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  isCompleted(route: string): boolean {
    // This should be replaced with actual completion tracking logic
    const completedRoutes = ['/basics', '/components', '/services'];
    return completedRoutes.some(completedRoute => route.includes(completedRoute));
  }

  getTopicProgress(topic: any): number {
    const total = topic.subTopics.length;
    const completed = topic.subTopics.filter((subTopic: any) =>
      this.isCompleted(subTopic.route)
    ).length;
    return Math.round((completed / total) * 100);
  }

  calculateProgress() {
    // Simulate progress calculation
    const completed = this.completedLessons;
    const total = this.totalLessons;
    this.progress = Math.round((completed / total) * 100);
  }

  updateCurrentRoute() {
    const url = this.router.url;
    const topic = this.navigationService.topics.find(t =>
      t.subTopics.some(st => url.includes(st.route))
    );

    if (topic) {
      const subTopic = topic.subTopics.find(st => url.includes(st.route));
      this.currentRoute = subTopic ? subTopic.title : topic.title;
    } else {
      this.currentRoute = 'Dashboard';
    }
  }

  continueLearning() {
    // Navigate to the next incomplete lesson
    const allLessons = this.navigationService.topics.flatMap(t => t.subTopics);
    const nextLesson = allLessons.find(lesson => !this.isCompleted(lesson.route));

    if (nextLesson) {
      this.router.navigate([nextLesson.route]);
    } else {
      this.router.navigate(['/']);
    }
  }

  showBookmarks() {
    // Implement bookmark functionality
    console.log('Show bookmarks');
  }
}