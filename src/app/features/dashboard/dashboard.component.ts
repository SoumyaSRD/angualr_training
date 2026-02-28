import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService, ToastService } from '@app/core';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container-fluid py-4">
      <div class="row g-4">
        <!-- Welcome Section -->
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <h1 class="h3 mb-2">Welcome back, {{ authService.username() }}!</h1>
              <p class="text-muted mb-0">Here's what's happening with your learning progress.</p>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <div class="bg-primary bg-opacity-10 rounded p-3">
                    <i class="bi bi-book fs-4 text-primary"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <p class="text-muted mb-1">Topics Completed</p>
                  <h3 class="mb-0">12</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <div class="bg-success bg-opacity-10 rounded p-3">
                    <i class="bi bi-check-circle fs-4 text-success"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <p class="text-muted mb-1">Quizzes Passed</p>
                  <h3 class="mb-0">8</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <div class="bg-warning bg-opacity-10 rounded p-3">
                    <i class="bi bi-clock fs-4 text-warning"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <p class="text-muted mb-1">Hours Learned</p>
                  <h3 class="mb-0">24</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <div class="bg-info bg-opacity-10 rounded p-3">
                    <i class="bi bi-trophy fs-4 text-info"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <p class="text-muted mb-1">Achievements</p>
                  <h3 class="mb-0">5</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Section -->
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 py-3">
              <h5 class="mb-0">Learning Progress</h5>
            </div>
            <div class="card-body">
              <div class="mb-4">
                <div class="d-flex justify-content-between mb-2">
                  <span>Angular Fundamentals</span>
                  <span class="text-primary">75%</span>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-primary" style="width: 75%"></div>
                </div>
              </div>
              <div class="mb-4">
                <div class="d-flex justify-content-between mb-2">
                  <span>TypeScript Basics</span>
                  <span class="text-success">90%</span>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-success" style="width: 90%"></div>
                </div>
              </div>
              <div class="mb-4">
                <div class="d-flex justify-content-between mb-2">
                  <span>RxJS & Observables</span>
                  <span class="text-warning">45%</span>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-warning" style="width: 45%"></div>
                </div>
              </div>
              <div class="mb-0">
                <div class="d-flex justify-content-between mb-2">
                  <span>Angular Material</span>
                  <span class="text-info">60%</span>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar bg-info" style="width: 60%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 py-3">
              <h5 class="mb-0">Recent Activity</h5>
            </div>
            <div class="card-body">
              <div class="d-flex mb-3">
                <div class="flex-shrink-0">
                  <i class="bi bi-check-circle-fill text-success"></i>
                </div>
                <div class="flex-grow-1 ms-2">
                  <p class="mb-0">Completed "Components Basics"</p>
                  <small class="text-muted">2 hours ago</small>
                </div>
              </div>
              <div class="d-flex mb-3">
                <div class="flex-shrink-0">
                  <i class="bi bi-play-circle-fill text-primary"></i>
                </div>
                <div class="flex-grow-1 ms-2">
                  <p class="mb-0">Started "Services & DI"</p>
                  <small class="text-muted">5 hours ago</small>
                </div>
              </div>
              <div class="d-flex mb-3">
                <div class="flex-shrink-0">
                  <i class="bi bi-trophy-fill text-warning"></i>
                </div>
                <div class="flex-grow-1 ms-2">
                  <p class="mb-0">Earned "Quick Learner" badge</p>
                  <small class="text-muted">1 day ago</small>
                </div>
              </div>
              <div class="d-flex mb-0">
                <div class="flex-shrink-0">
                  <i class="bi bi-file-earmark-check-fill text-info"></i>
                </div>
                <div class="flex-grow-1 ms-2">
                  <p class="mb-0">Passed TypeScript Quiz</p>
                  <small class="text-muted">2 days ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
    readonly authService = inject(AuthService);
    private readonly toastService = inject(ToastService);

    showToast(): void {
        this.toastService.success('Welcome to your dashboard!');
    }
}
