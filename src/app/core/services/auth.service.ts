import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public username = signal(localStorage.getItem('username') || 'Guest');
  private userRoles: string[] = ['admin', 'editor', 'reader'];

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    this.username.set('Guest');
    localStorage.clear();
  }

  login({ username, password }: { username: string; password: string }): boolean {
    this.username.set(username);
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', 'fake-jwt-token');
    return true;
  }

  getUserName(): string {
    return localStorage.getItem('username') || 'Guest';
  }
}
