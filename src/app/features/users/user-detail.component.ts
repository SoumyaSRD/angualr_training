import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-user-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container-fluid py-4">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/users">Users</a></li>
          <li class="breadcrumb-item active">User Details</li>
        </ol>
      </nav>

      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center mb-4">
            <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 80px; height: 80px;">
              <i class="bi bi-person fs-1 text-primary"></i>
            </div>
            <div>
              <h2 class="mb-1">User #{{ userId() }}</h2>
              <p class="text-muted mb-0">View and manage user details</p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <h5 class="mb-3">Basic Information</h5>
              <dl class="row">
                <dt class="col-sm-4">User ID</dt>
                <dd class="col-sm-8">{{ userId() }}</dd>
                
                <dt class="col-sm-4">Status</dt>
                <dd class="col-sm-8"><span class="badge bg-success">Active</span></dd>
                
                <dt class="col-sm-4">Role</dt>
                <dd class="col-sm-8">User</dd>
              </dl>
            </div>
            <div class="col-md-6">
              <h5 class="mb-3">Contact Information</h5>
              <dl class="row">
                <dt class="col-sm-4">Email</dt>
                <dd class="col-sm-8">user@example.com</dd>
                
                <dt class="col-sm-4">Phone</dt>
                <dd class="col-sm-8">+1 234 567 890</dd>
                
                <dt class="col-sm-4">Location</dt>
                <dd class="col-sm-8">New York, USA</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UserDetailComponent {
    private readonly route = inject(ActivatedRoute);

    readonly userId = toSignal(
        this.route.params.pipe(map((p) => p['id'])),
        { initialValue: '' }
    );
}
