import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LayoutComponent } from './core/layout/layout.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  template: `<app-layout></app-layout>`,
})
export class App {
  // Inject ThemeService to ensure it initializes early
  private readonly themeService = inject(ThemeService);
}
