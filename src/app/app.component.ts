import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavigationService } from './services/navigation.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
    MatExpansionModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="app-toolbar">
        <button mat-icon-button (click)="drawer.toggle()" class="menu-button">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="app-title">Angular – End-to-End Professional Training Program</span>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav
          #drawer
          [mode]="isMobile ? 'over' : 'side'"
          [opened]="!isMobile"
          class="sidenav"
        >
          <div class="sidenav-content">
            <mat-accordion multi>
              @for (topic of navigationService.topics; track topic.title) {
                <mat-expansion-panel>
                  <mat-expansion-panel-header>
                    <mat-panel-title>
                      <mat-icon>{{ topic.icon }}</mat-icon>
                      <span class="topic-title">{{ topic.title }}</span>
                    </mat-panel-title>
                  </mat-expansion-panel-header>

                  <mat-nav-list dense>
                    @for (subTopic of topic.subTopics; track subTopic.route) {
                      <a mat-list-item [routerLink]="subTopic.route" (click)="onNavClick()">
                        {{ subTopic.title }}
                      </a>
                    }
                  </mat-nav-list>
                </mat-expansion-panel>
              }
            </mat-accordion>
          </div>
        </mat-sidenav>

        <mat-sidenav-content class="main-content">
          <div class="content-wrapper">
            <router-outlet></router-outlet>
          </div>

          <footer class="app-footer">
            <p>Angular Professional Training © 2026</p>
            <div class="footer-links">
              <a href="https://angular.dev" target="_blank" rel="noopener">Angular Docs</a>
              <span class="separator">•</span>
              <a href="https://github.com/angular/angular" target="_blank" rel="noopener">GitHub</a>
            </div>
          </footer>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .app-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .app-title {
      font-size: 1.1rem;
      font-weight: 500;
    }

    .menu-button {
      margin-right: 16px;
    }

    .sidenav-container {
      flex: 1;
      overflow: hidden;
    }

    .sidenav {
      width: 320px;
      border-right: 1px solid rgba(0,0,0,0.12);
    }

    .sidenav-content {
      padding: 16px 0;
    }

    .topic-title {
      margin-left: 12px;
    }

    mat-expansion-panel {
      box-shadow: none !important;
    }

    mat-panel-title {
      display: flex;
      align-items: center;
    }

    mat-nav-list {
      padding-top: 0 !important;
    }

    mat-nav-list a {
      padding-left: 56px !important;
      font-size: 0.9rem;
    }

    .main-content {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }

    .content-wrapper {
      flex: 1;
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    .app-footer {
      background-color: #f5f5f5;
      padding: 24px;
      text-align: center;
      border-top: 1px solid rgba(0,0,0,0.12);
      margin-top: auto;
    }

    .app-footer p {
      margin: 0 0 8px 0;
      color: rgba(0,0,0,0.6);
    }

    .footer-links {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    .footer-links a {
      color: #1976d2;
      text-decoration: none;
    }

    .footer-links a:hover {
      text-decoration: underline;
    }

    .separator {
      color: rgba(0,0,0,0.4);
    }

    @media (max-width: 768px) {
      .app-title {
        font-size: 0.9rem;
      }

      .content-wrapper {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  isMobile = false;

  constructor(
    public navigationService: NavigationService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  onNavClick() {
    if (this.isMobile) {
      this.drawer.close();
    }
  }
}
