// login-dialog.component.ts (Minor fixes + compatibility)
import { Component, inject, signal, computed } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog'; // Required for directives
import { AuthService } from '@app/core';

@Component({
    selector: 'app-login-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatDialogModule, // Provides mat-dialog-content, mat-dialog-actions, mat-dialog-title
    ],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    private dialogRef = inject(MatDialogRef<Login>);
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
                // rememberMe: this.rememberMe(),
            });

            if (success) {
                this.dialogRef.close(true); // Success → guard proceeds
            } else {
                this.loginError.set('Invalid username or password. Please try again.');
            }
            this.isSubmitting.set(false);
        }, 1500);
    }

    cancel() {
        this.dialogRef.close(false);
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