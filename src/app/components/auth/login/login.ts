import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { AuthService, ModalService } from '@app/core';

@Component({
    selector: 'app-login-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="modal-header border-0 pb-0">
      <button 
        type="button" 
        class="btn-close ms-auto" 
        (click)="cancel()"
        aria-label="Close"
      ></button>
    </div>
    
    <div class="modal-body pt-0">
      <div class="text-center mb-4">
        <div class="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style="width: 64px; height: 64px;">
          <i class="bi bi-person-lock fs-2 text-primary"></i>
        </div>
        <h4 class="modal-title fw-bold">Sign In</h4>
        <p class="text-muted mb-0">Welcome back to Angular Professional Training</p>
      </div>

      <form (submit)="$event.preventDefault(); login()">
        <!-- Email Field -->
        <div class="mb-3">
          <label for="email" class="form-label fw-medium">Username</label>
          <div class="input-group">
            <span class="input-group-text bg-light">
              <i class="bi bi-person"></i>
            </span>
            <input
              type="text"
              class="form-control"
              [class.is-invalid]="emailError() && emailTouched()"
              id="email"
              [value]="email()"
              (input)="onEmailInput($event)"
              (blur)="emailTouched.set(true)"
              placeholder="Enter your username"
              autocomplete="username"
            />
          </div>
          @if (emailError() && emailTouched()) {
            <div class="invalid-feedback d-block">{{ emailError() }}</div>
          }
        </div>

        <!-- Password Field -->
        <div class="mb-3">
          <label for="password" class="form-label fw-medium">Password</label>
          <div class="input-group">
            <span class="input-group-text bg-light">
              <i class="bi bi-lock"></i>
            </span>
            <input
              [type]="hidePassword() ? 'password' : 'text'"
              class="form-control"
              [class.is-invalid]="passwordError() && passwordTouched()"
              id="password"
              [value]="password()"
              (input)="onPasswordInput($event)"
              (blur)="passwordTouched.set(true)"
              placeholder="Enter your password"
              autocomplete="current-password"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              (click)="onHidePasswordToggle()"
              [attr.aria-label]="hidePassword() ? 'Show password' : 'Hide password'"
            >
              <i class="bi" [class.bi-eye-slash]="hidePassword()" [class.bi-eye]="!hidePassword()"></i>
            </button>
          </div>
          @if (passwordError() && passwordTouched()) {
            <div class="invalid-feedback d-block">{{ passwordError() }}</div>
          }
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="rememberMe"
              [checked]="rememberMe()"
              (change)="rememberMe.set($event.target.checked)"
            />
            <label class="form-check-label" for="rememberMe">Remember me</label>
          </div>
          <a href="#" class="text-decoration-none small" (click)="$event.preventDefault()">Forgot password?</a>
        </div>

        <!-- Error Message -->
        @if (loginError()) {
          <div class="alert alert-danger d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <div>{{ loginError() }}</div>
          </div>
        }

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-primary w-100 py-2 fw-medium"
          [disabled]="!isFormValid() || isSubmitting()"
        >
          @if (isSubmitting()) {
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Signing in...
          } @else {
            <i class="bi bi-box-arrow-in-right me-2"></i>
            Sign In
          }
        </button>
      </form>
    </div>
  `,
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class Login {
    private modalService = inject(ModalService);
    private authService = inject(AuthService);

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