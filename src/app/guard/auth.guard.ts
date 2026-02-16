// auth.guard.ts (Functional Guard - Modern Angular Style)
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Login } from '../components/auth/login/login';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const dialog = inject(MatDialog);
    const router = inject(Router);

    // If already logged in, allow access immediately
    if (authService.isLoggedIn()) {
        return of(true);
    }

    // Open login dialog
    const dialogRef = dialog.open(Login, {
        width: '420px',
        maxWidth: '90vw',
        disableClose: false, // allows cancel (will redirect to home)
        autoFocus: false,
        // Optional: restore focus after close
        restoreFocus: true,
    });

    // Wait for dialog result
    return dialogRef.afterClosed().pipe(
        map((result) => {
            if (result === true) {
                // Login successful → proceed to guarded route
                return true;
            }
            // Cancelled or failed → redirect to home (or login page)
            return router.createUrlTree(['/home']);
        })
    );
};