import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, ThemeService, ToastService } from '@app/core';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-lg-8">
          <h1 class="h3 mb-4">Settings</h1>

          <!-- Profile Settings -->
          <div class="card mb-4">
            <div class="card-header bg-white">
              <h5 class="mb-0"><i class="bi bi-person me-2"></i>Profile</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Username</label>
                  <input type="text" class="form-control" [value]="authService.username()" readonly>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" placeholder="your@email.com">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Display Name</label>
                <input type="text" class="form-control" placeholder="How you want to be called">
              </div>
              <div class="mb-3">
                <label class="form-label">Bio</label>
                <textarea class="form-control" rows="3" placeholder="Tell us about yourself"></textarea>
              </div>
              <button class="btn btn-primary" (click)="saveProfile()">
                <i class="bi bi-check-lg me-2"></i>Save Changes
              </button>
            </div>
          </div>

          <!-- Appearance Settings -->
          <div class="card mb-4">
            <div class="card-header bg-white">
              <h5 class="mb-0"><i class="bi bi-palette me-2"></i>Appearance</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">Theme</label>
                <div class="d-flex gap-2">
                  @for (theme of themeService.themes; track theme) {
                    <button
                      class="btn"
                      [class.btn-primary]="themeService.currentTheme() === theme"
                      [class.btn-outline-secondary]="themeService.currentTheme() !== theme"
                      (click)="themeService.setTheme(theme)"
                    >
                      {{ theme | titlecase }}
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>

          <!-- Notification Settings -->
          <div class="card mb-4">
            <div class="card-header bg-white">
              <h5 class="mb-0"><i class="bi bi-bell me-2"></i>Notifications</h5>
            </div>
            <div class="card-body">
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" id="emailNotif" [(ngModel)]="emailNotifications">
                <label class="form-check-label" for="emailNotif">Email Notifications</label>
              </div>
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" id="pushNotif" [(ngModel)]="pushNotifications">
                <label class="form-check-label" for="pushNotif">Push Notifications</label>
              </div>
              <div class="form-check form-switch mb-0">
                <input class="form-check-input" type="checkbox" id="weeklyDigest" [(ngModel)]="weeklyDigest">
                <label class="form-check-label" for="weeklyDigest">Weekly Digest</label>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div class="card">
            <div class="card-header bg-white">
              <h5 class="mb-0"><i class="bi bi-shield-lock me-2"></i>Security</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">Current Password</label>
                <input type="password" class="form-control" placeholder="Enter current password">
              </div>
              <div class="mb-3">
                <label class="form-label">New Password</label>
                <input type="password" class="form-control" placeholder="Enter new password">
              </div>
              <div class="mb-3">
                <label class="form-label">Confirm New Password</label>
                <input type="password" class="form-control" placeholder="Confirm new password">
              </div>
              <button class="btn btn-primary" (click)="changePassword()">
                <i class="bi bi-key me-2"></i>Change Password
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <div class="card">
            <div class="card-body text-center">
              <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 100px; height: 100px;">
                <i class="bi bi-person fs-1 text-primary"></i>
              </div>
              <h5 class="mb-1">{{ authService.username() }}</h5>
              <p class="text-muted mb-3">{{ authService.isLoggedIn() ? 'Active Member' : 'Guest' }}</p>
              <button class="btn btn-outline-primary w-100">
                <i class="bi bi-camera me-2"></i>Change Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SettingsComponent {
    readonly authService = inject(AuthService);
    readonly themeService = inject(ThemeService);
    private readonly toastService = inject(ToastService);

    emailNotifications = signal(true);
    pushNotifications = signal(false);
    weeklyDigest = signal(true);

    saveProfile(): void {
        this.toastService.success('Profile saved successfully!');
    }

    changePassword(): void {
        this.toastService.success('Password changed successfully!');
    }
}
