import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <footer class="footer py-3 mt-auto">
      <div class="container-fluid">
        <div class="d-flex flex-wrap justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-code-square text-primary"></i>
            <span class="text-muted">Angular Academy</span>
          </div>
          
          <div class="d-flex gap-3">
            <a href="https://github.com/SoumyaSRD/angualr_training"  target="_blank" class="text-muted text-decoration-none">
              <i class="bi bi-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/soumyasrd/" target="_blank" class="text-muted text-decoration-none">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/in/soumyasrd/" target="_blank" class="text-muted text-decoration-none">
              <i class="bi bi-linkedin"></i>
            </a>
          </div>
          
          <div class="text-muted small">
            &copy; {{ currentYear }} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      background: var(--surface-color);
      border-top: 1px solid var(--border-color);
    }
  `]
})
export class FooterComponent {
    readonly currentYear = new Date().getFullYear();
}
