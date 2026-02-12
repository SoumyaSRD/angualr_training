import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userRoles: string[] = ['admin', 'editor', 'reader']; // Example roles
    hasRole(role: string): boolean {
        return this.userRoles.includes(role);
    }
}