import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme =
  // Light
  | 'arctic'
  | 'sunset'
  | 'emerald'
  | 'cyber'
  // Dark
  | 'midnight'
  | 'aurora'
  | 'obsidian'
  | 'blood-moon'
  | 'ocean-deep'
  | 'lava'
  // Batman
  | 'batman'
  // Cool
  | 'neon-noir'
  | 'hologram'
  | 'galaxy'
  // Anime
  | 'sakura'
  | 'dragonball'
  | 'evangelion';

export interface ThemeConfig {
  id: Theme;
  name: string;
  icon: string;
  description: string;
  gradient: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'glass-ui-theme';

  // Theme configurations
  readonly themes: ThemeConfig[] = [
    // ── Light Themes ────────────────────────────────────────────────────────
    {
      id: 'arctic',
      name: 'Arctic Minimal',
      icon: 'bi-snow',
      description: 'Clean frost glass with indigo-violet accents',
      gradient: 'linear-gradient(135deg, #f8fafc, #e8edf5, #ede9fe)',
    },
    {
      id: 'sunset',
      name: 'Sunset Glass',
      icon: 'bi-sunset-fill',
      description: 'Warm orange & pink gradients with creative energy',
      gradient: 'linear-gradient(135deg, #fff7ed, #fde8d0, #fbcfe8)',
    },
    {
      id: 'emerald',
      name: 'Emerald Depth',
      icon: 'bi-gem',
      description: 'Nature-premium green with teal accents',
      gradient: 'linear-gradient(135deg, #ecfdf5, #bbf7d0, #6ee7b7)',
    },
    {
      id: 'cyber',
      name: 'Cyber Ice',
      icon: 'bi-cpu-fill',
      description: 'High-contrast ultramodern with electric cyan highlights',
      gradient: 'linear-gradient(135deg, #f0fdff, #e0f7fe, #ccf7ff)',
    },

    // ── Dark Themes ──────────────────────────────────────────────────────────
    {
      id: 'midnight',
      name: 'Midnight Crystal',
      icon: 'bi-moon-stars-fill',
      description: 'Deep space luxury with neon violet glow',
      gradient: 'linear-gradient(135deg, #060b18, #1a1456, #200d3a)',
    },
    {
      id: 'aurora',
      name: 'Aurora Frost',
      icon: 'bi-stars',
      description: 'Hyperreal dark with shifting cyan & magenta aura',
      gradient: 'linear-gradient(135deg, #0a0a1a, #1a0a2e, #0a1a28)',
    },
    {
      id: 'obsidian',
      name: 'Obsidian',
      icon: 'bi-circle-fill',
      description: 'Pure refined black with silver-white accents',
      gradient: 'linear-gradient(135deg, #0a0a0a, #111118, #0f0f18)',
    },
    {
      id: 'blood-moon',
      name: 'Blood Moon',
      icon: 'bi-moon-fill',
      description: 'Crimson dark — danger and horror aesthetic',
      gradient: 'linear-gradient(135deg, #0d0305, #1a0408, #2d0510)',
    },
    {
      id: 'ocean-deep',
      name: 'Ocean Deep',
      icon: 'bi-water',
      description: 'Dark teal abyss with bioluminescent glow',
      gradient: 'linear-gradient(135deg, #020e1a, #041828, #062535)',
    },
    {
      id: 'lava',
      name: 'Lava',
      icon: 'bi-fire',
      description: 'Volcanic ash surface with molten orange fire',
      gradient: 'linear-gradient(135deg, #0c0500, #1a0800, #2d1000)',
    },

    // ── Batman Theme ─────────────────────────────────────────────────────────
    {
      id: 'batman',
      name: 'Batman',
      icon: 'bi-shield-fill',
      description: 'Gotham darkness with the signal yellow glow',
      gradient: 'linear-gradient(135deg, #080808, #100e08, #1a1608)',
    },

    // ── Cool Themes ───────────────────────────────────────────────────────────
    {
      id: 'neon-noir',
      name: 'Neon Noir',
      icon: 'bi-lightning-charge-fill',
      description: 'Cyberpunk dark with hot magenta and electric cyan',
      gradient: 'linear-gradient(135deg, #04010a, #08011a, #0a0120)',
    },
    {
      id: 'hologram',
      name: 'Hologram',
      icon: 'bi-brightness-high-fill',
      description: 'Iridescent prismatic light with shifting spectrum',
      gradient: 'linear-gradient(135deg, #e8d5ff, #d5e8ff, #d5ffd5, #fff5d5)',
    },
    {
      id: 'galaxy',
      name: 'Galaxy',
      icon: 'bi-star-fill',
      description: 'Deep cosmos starfield with periwinkle luminescence',
      gradient: 'linear-gradient(135deg, #03001c, #06002e, #10004a)',
    },

    // ── Anime Themes ──────────────────────────────────────────────────────────
    {
      id: 'sakura',
      name: 'Sakura',
      icon: 'bi-flower1',
      description: 'Cherry blossom shōjo — soft pink glass & violet mist',
      gradient: 'linear-gradient(135deg, #fff1f5, #ffe4ec, #fce7f3)',
    },
    {
      id: 'dragonball',
      name: 'Dragon Ball',
      icon: 'bi-trophy-fill',
      description: 'SSJ power aura — solar orange to saiyan gold',
      gradient: 'linear-gradient(135deg, #0e0800, #2e1800, #441e00)',
    },
    {
      id: 'evangelion',
      name: 'Evangelion',
      icon: 'bi-hexagon-fill',
      description: 'NERV clinical dark with impact orange and scan-line flicker',
      gradient: 'linear-gradient(135deg, #060608, #100e18, #1a1020)',
    },
  ];

  // -------------------------
  // SIGNAL STATE
  // -------------------------

  private readonly currentThemeSignal = signal<Theme>(this.loadTheme());
  readonly currentTheme = computed(() => this.currentThemeSignal());

  readonly currentThemeConfig = computed(
    () =>
      this.themes.find((t) => t.id === this.currentThemeSignal()) ??
      this.themes[0]
  );

  readonly isDarkTheme = computed(
    () => this.currentThemeSignal() === 'midnight'
  );

  private readonly isTransitioningSignal = signal(false);
  readonly isTransitioning = computed(() => this.isTransitioningSignal());

  constructor() {
    effect(() => {
      const theme = this.currentThemeSignal();
      this.applyThemeWithTransition(theme);
      this.saveTheme(theme);
    });
  }

  // -------------------------
  // PUBLIC API
  // -------------------------

  setTheme(theme: Theme): void {
    if (theme !== this.currentThemeSignal()) {
      this.currentThemeSignal.set(theme);
    }
  }

  cycleTheme(): void {
    const currentIndex = this.themes.findIndex(
      (t) => t.id === this.currentThemeSignal()
    );
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.setTheme(this.themes[nextIndex].id);
  }

  getTheme(id: Theme): ThemeConfig | undefined {
    return this.themes.find((t) => t.id === id);
  }

  // -------------------------
  // THEME APPLICATION
  // -------------------------

  private applyThemeWithTransition(theme: Theme): void {
    this.isTransitioningSignal.set(true);

    this.document.body.classList.add('theme-transitioning');

    this.applyTheme(theme);
    this.updateMetaThemeColor(theme);

    setTimeout(() => {
      this.document.body.classList.remove('theme-transitioning');
      this.isTransitioningSignal.set(false);
    }, 300);
  }

  private applyTheme(theme: Theme): void {
    const root = this.document.documentElement;

    // Set data attribute - this triggers CSS variable changes
    root.setAttribute('data-theme', theme);

    // Remove previous theme-* classes
    this.themes.forEach((t) => {
      this.document.body.classList.remove(`theme-${t.id}`);
    });

    // Add current theme class
    this.document.body.classList.add(`theme-${theme}`);

    // Debug log
    console.log('[ThemeService] Applied theme:', theme);
  }

  private updateMetaThemeColor(theme: Theme): void {
    const metaThemeColor = this.document.querySelector(
      'meta[name="theme-color"]'
    );

    if (!metaThemeColor) return;

    const colors: Record<Theme, string> = {
      // Light
      arctic: '#f8fafc',
      sunset: '#fff7ed',
      emerald: '#ecfdf5',
      cyber: '#f0fdff',
      // Dark
      midnight: '#060b18',
      aurora: '#0a0a1a',
      obsidian: '#0a0a0a',
      'blood-moon': '#0d0305',
      'ocean-deep': '#020e1a',
      lava: '#0c0500',
      // Batman
      batman: '#080808',
      // Cool
      'neon-noir': '#04010a',
      hologram: '#f0f4ff',
      galaxy: '#03001c',
      // Anime
      sakura: '#fff1f5',
      dragonball: '#0e0800',
      evangelion: '#060608',
    };

    metaThemeColor.setAttribute('content', colors[theme]);
  }

  // -------------------------
  // STORAGE
  // -------------------------

  private loadTheme(): Theme {
    if (typeof window === 'undefined') return 'arctic';

    try {
      // First check if inline script already set the theme
      const currentAttr = document.documentElement.getAttribute('data-theme');
      if (currentAttr && this.isValidTheme(currentAttr)) {
        console.log('[ThemeService] Loaded theme from HTML attribute:', currentAttr);
        return currentAttr as Theme;
      }

      // Fall back to localStorage
      const stored = localStorage.getItem(this.storageKey);
      if (stored && this.isValidTheme(stored)) {
        console.log('[ThemeService] Loaded theme from localStorage:', stored);
        return stored as Theme;
      }
    } catch (e) {
      console.error('[ThemeService] Error loading theme:', e);
    }

    console.log('[ThemeService] Using default theme: arctic');
    return 'arctic';
  }

  private saveTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.storageKey, theme);
      console.log('[ThemeService] Saved theme to localStorage:', theme);
    } catch (e) {
      console.error('[ThemeService] Error saving theme:', e);
    }
  }

  private isValidTheme(theme: string): theme is Theme {
    return this.themes.some((t) => t.id === theme);
  }
}