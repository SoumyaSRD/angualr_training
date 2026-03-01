import { CommonModule } from '@angular/common';
import {
    Component,
    ChangeDetectionStrategy,
    output,
    inject,
    signal,
    OnDestroy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, ThemeService, type Theme } from '@app/core';

// Bootstrap Offcanvas — loaded via the global bootstrap bundle in angular.json
declare const bootstrap: {
    Offcanvas: new (el: HTMLElement, opts?: object) => {
        show(): void;
        hide(): void;
        dispose(): void;
    };
};

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './header.scss',
    templateUrl: './header.html',
})
export class HeaderComponent implements OnDestroy {
    readonly themeService = inject(ThemeService);
    readonly authService = inject(AuthService);

    readonly menuToggle = output<void>();

    // ── Bootstrap Offcanvas instance ────────────────────────────────────────
    private bsOffcanvas: ReturnType<typeof bootstrap.Offcanvas.prototype.show> | null = null;
    private offcanvasInstance: InstanceType<typeof bootstrap.Offcanvas> | null = null;

    // ── Filtered theme groups (signals) ─────────────────────────────────────
    readonly lightThemes = signal(this.themeService.themes.filter(t =>
        ['arctic', 'sunset', 'emerald', 'cyber'].includes(t.id)));

    readonly darkThemes = signal(this.themeService.themes.filter(t =>
        ['midnight', 'aurora', 'obsidian', 'blood-moon', 'ocean-deep', 'lava'].includes(t.id)));

    readonly batmanThemes = signal(this.themeService.themes.filter(t =>
        ['batman'].includes(t.id)));

    readonly coolThemes = signal(this.themeService.themes.filter(t =>
        ['neon-noir', 'hologram', 'galaxy'].includes(t.id)));

    readonly animeThemes = signal(this.themeService.themes.filter(t =>
        ['sakura', 'dragonball', 'evangelion'].includes(t.id)));

    // ── Offcanvas open/close ─────────────────────────────────────────────────

    openThemePanel(): void {
        const el = document.getElementById('themeOffcanvas');
        if (!el) return;

        if (!this.offcanvasInstance) {
            this.offcanvasInstance = new bootstrap.Offcanvas(el, { backdrop: true, scroll: false });
        }
        this.offcanvasInstance.show();
    }

    closeThemePanel(): void {
        this.offcanvasInstance?.hide();
    }

    // ── Actions ──────────────────────────────────────────────────────────────

    setTheme(themeId: string): void {
        this.themeService.setTheme(themeId as Theme);
        // Keep panel open so users can preview themes without reopening
    }

    onToggleMenu(): void {
        this.menuToggle.emit();
    }

    logout(): void {
        this.authService.logout();
    }

    login(): void {
        window.dispatchEvent(new CustomEvent('app:login'));
    }

    // ── Cleanup ───────────────────────────────────────────────────────────────

    ngOnDestroy(): void {
        this.offcanvasInstance?.dispose();
    }
}