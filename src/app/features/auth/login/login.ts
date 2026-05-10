import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed, effect } from '@angular/core';
import { AuthService, ModalService } from '@app/core';
import { ThemeService } from '@app/core/services/theme.service';

@Component({
    selector: 'app-login-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="login-overlay" (click)="handleOverlayClick($event)">
      <div class="login-modal">
        <div class="login-header">
          <button 
            type="button" 
            class="close-button"
            (click)="cancel()"
            aria-label="Close login dialog"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div class="login-body">
          <div class="login-brand">
            <div class="brand-icon">
              <i class="bi bi-person-lock"></i>
            </div>
            <h2 class="brand-title">Welcome Back</h2>
            <p class="brand-subtitle">Sign in to continue your learning journey</p>
          </div>

          <form class="login-form" (submit)="$event.preventDefault(); login()">
            <!-- Email Field -->
            <div class="form-group">
              <label for="email" class="form-label">Username</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <i class="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  class="form-input"
                  [class.input-error]="emailError() && emailTouched()"
                  id="email"
                  [value]="email()"
                  (input)="onEmailInput($event)"
                  (blur)="emailTouched.set(true)"
                  placeholder="Enter your username"
                  autocomplete="username"
                />
              </div>
              @if (emailError() && emailTouched()) {
                <div class="error-message">{{ emailError() }}</div>
              }
            </div>

            <!-- Password Field -->
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <i class="bi bi-lock"></i>
                </span>
                <input
                  [type]="hidePassword() ? 'password' : 'text'"
                  class="form-input"
                  [class.input-error]="passwordError() && passwordTouched()"
                  id="password"
                  [value]="password()"
                  (input)="onPasswordInput($event)"
                  (blur)="passwordTouched.set(true)"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                />
                <button
                  class="password-toggle"
                  type="button"
                  (click)="onHidePasswordToggle()"
                  [attr.aria-label]="hidePassword() ? 'Show password' : 'Hide password'"
                >
                  <i class="bi" [class.bi-eye-slash]="hidePassword()" [class.bi-eye]="!hidePassword()"></i>
                </button>
              </div>
              @if (passwordError() && passwordTouched()) {
                <div class="error-message">{{ passwordError() }}</div>
              }
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="form-options">
              <div class="checkbox-group">
                <input
                  class="form-checkbox"
                  type="checkbox"
                  id="rememberMe"
                  [checked]="rememberMe()"
                  (change)="rememberMe.set($event.target.checked)"
                />
                <label class="checkbox-label" for="rememberMe">Remember me</label>
              </div>
              <a href="#" class="forgot-link" (click)="$event.preventDefault()">Forgot password?</a>
            </div>

            <!-- Error Message -->
            @if (loginError()) {
              <div class="alert alert-error" role="alert">
                <i class="bi bi-exclamation-triangle-fill alert-icon"></i>
                <div class="alert-content">{{ loginError() }}</div>
              </div>
            }

            <!-- Submit Button -->
            <button
              type="submit"
              class="submit-button"
              [disabled]="!isFormValid() || isSubmitting()"
            >
              @if (isSubmitting()) {
                <span class="spinner" role="status" aria-hidden="true"></span>
                Signing in...
              } @else {
                <i class="bi bi-box-arrow-in-right button-icon"></i>
                Sign In
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    /* Overlay background that adapts to theme */
    .login-overlay {
      position: fixed;
      inset: 0;
      background: color-mix(in srgb, var(--bg-primary, #f8fafc) 85%, transparent);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-md, 16px);
      z-index: 1050;
      animation: fadeIn 0.3s var(--ease-smooth, cubic-bezier(0.4, 0, 0.2, 1));
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Modal card with glassmorphism theme compatibility */
    .login-modal {
      width: 100%;
      max-width: 420px;
      border-radius: var(--radius-xl, 28px);
      background: var(--glass-bg, rgba(255, 255, 255, 0.55));
      backdrop-filter: blur(var(--glass-blur, 20px));
      border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.5));
      box-shadow: 
        var(--elev-4, 0 16px 40px rgba(0,0,0,0.12)),
        var(--glass-inner-shadow, inset 0 1px 0 rgba(255,255,255,0.6));
      overflow: hidden;
      transform: translateY(0);
      transition: all 0.4s var(--ease-spring, cubic-bezier(0.175, 0.885, 0.32, 1.275));
      animation: slideUp 0.4s var(--ease-spring);
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .login-modal:hover {
      transform: translateY(-4px);
      box-shadow: var(--elev-5, 0 28px 64px rgba(0,0,0,0.16));
    }

    /* Header with theme-aware close button */
    .login-header {
      display: flex;
      justify-content: flex-end;
      padding: var(--space-md, 16px);
    }

    .close-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: var(--radius-full, 9999px);
      border: none;
      background: var(--glass-bg-deep, rgba(255, 255, 255, 0.25));
      color: var(--text-muted, #94a3b8);
      cursor: pointer;
      transition: all 0.2s var(--ease-smooth);
      backdrop-filter: blur(8px);
    }

    .close-button:hover {
      background: var(--glass-bg-hover, rgba(255, 255, 255, 0.8));
      color: var(--text-primary, #0f172a);
      transform: rotate(90deg) scale(1.1);
      box-shadow: var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.06));
    }

    /* Body padding with theme spacing */
    .login-body {
      padding: var(--space-xl, 40px) var(--space-lg, 24px) var(--space-lg, 24px);
    }

    /* Brand section with theme-aware colors */
    .login-brand {
      text-align: center;
      margin-bottom: var(--space-xl, 40px);
    }

    .brand-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 72px;
      height: 72px;
      border-radius: var(--radius-full, 9999px);
      background: var(--accent-gradient, linear-gradient(135deg, #6366f1, #8b5cf6));
      margin-bottom: var(--space-md, 16px);
      box-shadow: var(--shadow-md, 0 8px 24px rgba(0,0,0,0.08));
      position: relative;
      overflow: hidden;
    }

    .brand-icon::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--glass-refract-light, rgba(255,255,255,0.55));
      opacity: 0.7;
      transform: rotate(45deg) translateX(-20%);
    }

    .brand-icon i {
      font-size: var(--type-xl, 1.5rem);
      color: var(--text-on-accent, white);
      position: relative;
      z-index: 1;
    }

    .brand-title {
      font-size: var(--type-2xl, 2rem);
      font-weight: 700;
      color: var(--text-primary, #0f172a);
      margin: 0 0 var(--space-xs, 4px);
      letter-spacing: var(--type-tracking-tight, -0.03em);
    }

    .brand-subtitle {
      font-size: var(--type-base, 1rem);
      color: var(--text-secondary, #475569);
      margin: 0;
      line-height: var(--type-leading-snug, 1.25);
    }

    /* Form styling with theme compatibility */
    .login-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg, 24px);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs, 4px);
    }

    .form-label {
      font-size: var(--type-sm, 0.875rem);
      font-weight: 600;
      color: var(--text-primary, #0f172a);
      letter-spacing: var(--type-tracking-wide, 0.04em);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: var(--space-md, 16px);
      display: flex;
      align-items: center;
      color: var(--text-muted, #94a3b8);
      z-index: 2;
      font-size: var(--type-base, 1rem);
    }

    .form-input {
      width: 100%;
      padding: var(--space-md, 16px) var(--space-md, 16px) var(--space-md, 16px) var(--space-2xl, 64px);
      border-radius: var(--radius-lg, 20px);
      border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.5));
      background: var(--glass-bg, rgba(255, 255, 255, 0.55));
      color: var(--text-primary, #0f172a);
      font-size: var(--type-base, 1rem);
      font-family: var(--font-body, 'DM Sans', sans-serif);
      backdrop-filter: blur(var(--glass-blur, 20px));
      transition: all 0.2s var(--ease-smooth);
      box-shadow: var(--glass-inner-shadow);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--accent-primary, #6366f1);
      box-shadow: 
        0 0 0 3px color-mix(in srgb, var(--accent-primary, #6366f1) 15%, transparent),
        var(--glass-inner-shadow);
      background: var(--glass-bg-hover, rgba(255, 255, 255, 0.8));
      transform: translateY(-1px);
    }

    .form-input.input-error {
      border-color: var(--error, #ef4444);
      box-shadow: 
        0 0 0 3px color-mix(in srgb, var(--error, #ef4444) 15%, transparent),
        var(--glass-inner-shadow);
    }

    .form-input::placeholder {
      color: var(--text-muted, #94a3b8);
    }

    .password-toggle {
      position: absolute;
      right: var(--space-sm, 8px);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md, 12px);
      border: none;
      background: var(--glass-bg-deep, rgba(255, 255, 255, 0.25));
      color: var(--text-muted, #94a3b8);
      cursor: pointer;
      transition: all 0.2s var(--ease-smooth);
      z-index: 2;
      backdrop-filter: blur(8px);
    }

    .password-toggle:hover {
      background: var(--glass-bg-hover, rgba(255, 255, 255, 0.8));
      color: var(--text-primary, #0f172a);
      transform: scale(1.05);
    }

    .error-message {
      font-size: var(--type-sm, 0.875rem);
      color: var(--error, #ef4444);
      margin-top: var(--space-xs, 4px);
      display: flex;
      align-items: center;
      gap: var(--space-xs, 4px);
    }

    .error-message::before {
      content: '⚠';
      font-size: 0.8em;
    }

    /* Form options row */
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm, 8px) 0;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: var(--space-xs, 4px);
    }

    .form-checkbox {
      width: 18px;
      height: 18px;
      border-radius: var(--radius-sm, 8px);
      border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.5));
      background: var(--glass-bg, rgba(255, 255, 255, 0.55));
      accent-color: var(--accent-primary, #6366f1);
      backdrop-filter: blur(4px);
    }

    .form-checkbox:checked {
      background: var(--accent-primary, #6366f1);
      border-color: var(--accent-primary, #6366f1);
    }

    .checkbox-label {
      font-size: var(--type-sm, 0.875rem);
      color: var(--text-secondary, #475569);
      cursor: pointer;
      user-select: none;
    }

    .forgot-link {
      font-size: var(--type-sm, 0.875rem);
      color: var(--accent-primary, #6366f1);
      text-decoration: none;
      transition: all 0.2s var(--ease-smooth);
      font-weight: 500;
    }

    .forgot-link:hover {
      color: var(--accent-secondary, #8b5cf6);
      text-decoration: underline;
      transform: translateY(-1px);
    }

    /* Alert styling with theme error colors */
    .alert {
      display: flex;
      align-items: flex-start;
      gap: var(--space-sm, 8px);
      padding: var(--space-md, 16px);
      border-radius: var(--radius-lg, 20px);
      background: var(--error-bg, rgba(239, 68, 68, 0.12));
      border: 1px solid color-mix(in srgb, var(--error, #ef4444) 30%, transparent);
      backdrop-filter: blur(8px);
    }

    .alert-icon {
      color: var(--error, #ef4444);
      font-size: 1.125rem;
      margin-top: 2px;
      flex-shrink: 0;
    }

    .alert-content {
      color: var(--error, #ef4444);
      font-size: var(--type-sm, 0.875rem);
      line-height: var(--type-leading-snug, 1.25);
    }

    /* Submit button with theme gradient */
    .submit-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm, 8px);
      width: 100%;
      padding: var(--space-md, 16px);
      border-radius: var(--radius-lg, 20px);
      border: none;
      background: var(--accent-gradient, linear-gradient(135deg, #6366f1, #8b5cf6));
      color: var(--text-on-accent, white);
      font-size: var(--type-base, 1rem);
      font-weight: 600;
      font-family: var(--font-body, 'DM Sans', sans-serif);
      cursor: pointer;
      transition: all 0.3s var(--ease-spring);
      box-shadow: 
        var(--shadow-md, 0 8px 24px rgba(0,0,0,0.08)),
        0 0 0 1px rgba(255,255,255,0.1);
      position: relative;
      overflow: hidden;
    }

    .submit-button::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(145deg, 
        rgba(255,255,255,0.3) 0%, 
        transparent 50%, 
        rgba(0,0,0,0.1) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 
        var(--shadow-lg, 0 20px 40px rgba(0,0,0,0.1)),
        var(--shadow-glow, 0 0 0 1px rgba(99,102,241,0.3), 0 8px 32px rgba(99,102,241,0.3));
    }

    .submit-button:hover:not(:disabled)::before {
      opacity: 1;
    }

    .submit-button:active:not(:disabled) {
      transform: translateY(0) scale(0.98);
    }

    .submit-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
      box-shadow: var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.06));
    }

    .button-icon {
      font-size: 1.125rem;
    }

    .spinner {
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Responsive adjustments */
    @media (max-width: 576px) {
      .login-overlay {
        padding: var(--space-sm, 8px);
      }
      
      .login-body {
        padding: var(--space-lg, 24px) var(--space-md, 16px);
      }
      
      .brand-title {
        font-size: var(--type-xl, 1.5rem);
      }
    }

    /* Dark theme specific adjustments */
    @media (prefers-color-scheme: dark) {
      .form-input {
        background: var(--glass-bg-deep, rgba(255, 255, 255, 0.25));
      }
      
      .form-input:focus {
        background: var(--glass-bg-hover, rgba(255, 255, 255, 0.8));
      }
    }
  `]
})
export class Login {
    private modalService = inject(ModalService);
    private authService = inject(AuthService);
    private themeService = inject(ThemeService);

    // Theme integration
    currentTheme = this.themeService.currentTheme;
    isDarkTheme = this.themeService.isDarkTheme;

    // Form signals
    email = signal('');
    password = signal('');
    rememberMe = signal(false);
    hidePassword = signal(true);

    // Touched signals
    emailTouched = signal(false);
    passwordTouched = signal(false);

    // Submission state
    isSubmitting = signal(false);
    loginError = signal<string | null>(null);

    // Validation
    emailError = computed(() => {
        const value = this.email().trim();
        if (!value) return 'Username is required';
        return null;
    });

    passwordError = computed(() => {
        const value = this.password();
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return null;
    });

    isFormValid = computed(() => {
        return !this.emailError() && !this.passwordError();
    });

    constructor() {
        // Theme effect - can be used for theme-specific logic if needed
        effect(() => {
            const theme = this.currentTheme();
            console.log('[Login] Current theme:', theme);
            // Add any theme-specific logic here if needed
        });
    }

    login() {
        this.emailTouched.set(true);
        this.passwordTouched.set(true);

        if (!this.isFormValid()) return;

        this.isSubmitting.set(true);
        this.loginError.set(null);

        // Simulate async login with timeout
        setTimeout(() => {
            const success = this.authService.login({
                username: this.email().trim(),
                password: this.password(),
            });

            if (success) {
                this.modalService.closeAll();
            } else {
                this.loginError.set('Invalid username or password. Please try again.');
            }
            this.isSubmitting.set(false);
        }, 1500);
    }

    cancel() {
        this.modalService.closeAll();
    }

    handleOverlayClick(event: Event) {
        // Close modal when clicking outside
        if (event.target === event.currentTarget) {
            this.cancel();
        }
    }

    onEmailInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.email.set(value);
    }

    onPasswordInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.password.set(value);
    }

    onHidePasswordToggle(): void {
        this.hidePassword.update(v => !v);
    }
}