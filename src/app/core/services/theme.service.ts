import { Injectable, signal } from '@angular/core';

export type AppTheme = 'light' | 'dark' | 'corporate' | 'glass';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'angular-academy-theme';

  /** Single source of truth for the current theme. */
  private readonly theme = signal<AppTheme>('light');

  /** Available themes for dropdowns / selectors. */
  readonly themes: AppTheme[] = ['light', 'dark', 'corporate', 'glass'];

  /** Expose current theme as read-only signal. */
  readonly currentTheme = this.theme.asReadonly();

  /** Back-compat: some components read this signal directly. */
  readonly isDarkSelected = signal(false);

  constructor() {
    this.initTheme();
  }

  toggleTheme(): void {
    // Convenience toggle between light and dark; dropdown can set others explicitly.
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: AppTheme): void {
    this.theme.set(theme);
    this.isDarkSelected.set(theme === 'dark');
    this.persistTheme(theme);
    this.applyThemeToDom(theme);
  }

  /** Used in templates. Reads a signal -> updates instantly without reload. */
  isDarkTheme(): boolean {
    return this.theme() === 'dark';
  }

  getThemePreference(): AppTheme | 'system' {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (!saved) return 'system';
    if (['light', 'dark', 'corporate', 'glass'].includes(saved)) {
      return saved as AppTheme;
    }
    return 'system';
  }

  private initTheme(): void {
    const saved = this.getThemePreference();
    const initial: AppTheme =
      saved === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : saved;
    this.setTheme(initial);
  }

  private persistTheme(theme: AppTheme): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  private applyThemeToDom(theme: AppTheme): void {
    const root = document.documentElement;
    // Scalable hook for multiple themes later
    root.dataset['theme'] = theme;
    // Back-compat with existing CSS (.dark-theme)
    root.classList.toggle('dark-theme', theme === 'dark');
  }
}
