import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'angular-academy-theme';
  private isDark = false;

  constructor() {
    this.loadTheme();
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.isDark = savedTheme === 'dark';
    } else {
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.saveTheme();
    this.applyTheme();
  }

  setTheme(isDark: boolean): void {
    this.isDark = isDark;
    this.saveTheme();
    this.applyTheme();
  }

  isDarkTheme(): boolean {
    return this.isDark;
  }

  private applyTheme(): void {
    if (this.isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

  private saveTheme(): void {
    localStorage.setItem(this.THEME_KEY, this.isDark ? 'dark' : 'light');
  }

  getThemePreference(): 'light' | 'dark' | 'system' {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (!savedTheme) return 'system';
    return savedTheme as 'light' | 'dark';
  }
}
