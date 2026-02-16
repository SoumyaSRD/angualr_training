import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public username = signal(localStorage.getItem('username') || 'Guest');
    private userRoles: string[] = ['admin', 'editor', 'reader']; // Example roles
    hasRole(role: string): boolean {
        return this.userRoles.includes(role);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('authToken');
    }

    logout() {
        this.username.set('Guest');
        localStorage.clear();
    }

    login({ username, password }: { username: string, password: string }): boolean {
        // Simulate login logic (replace with real API call)
        // if (username === 'admin' && password === 'password') {
        this.username.set(username);

        localStorage.setItem('username', username);
        localStorage.setItem('authToken', 'fake-jwt-token');
        return true;
        // }
        // return false;

    }
    getUserName(): string {
        // Simulate fetching user name (replace with real API call)
        return localStorage.getItem('username') || 'Guest';
    }
}