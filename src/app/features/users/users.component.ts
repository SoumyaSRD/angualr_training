import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    joinedDate: string;
}

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container-fluid py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 mb-1">Users</h1>
          <p class="text-muted mb-0">Manage your team members and their permissions.</p>
        </div>
        <button class="btn btn-primary" (click)="addUser()">
          <i class="bi bi-plus-lg me-2"></i>Add User
        </button>
      </div>

      <div class="card">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (user of users(); track user.id) {
                <tr>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                  <td>
                    <span class="badge" [class.bg-success]="user.status === 'active'" [class.bg-secondary]="user.status === 'inactive'">
                      {{ user.status }}
                    </span>
                  </td>
                  <td>{{ user.joinedDate }}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary me-1">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class UsersComponent {
    readonly users = signal<User[]>([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinedDate: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinedDate: '2024-02-20' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', joinedDate: '2024-03-10' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', joinedDate: '2024-04-05' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', joinedDate: '2024-05-12' },
    ]);

    addUser(): void {
        console.log('Add user clicked');
    }
}
