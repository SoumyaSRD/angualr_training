import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { Login } from '../../components/auth/login/login';

/**
 * Route data interface for role-based access
 */
export interface AuthRouteData {
  roles?: string[];
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * Authentication guard with optional role-based access control
 * 
 * Usage in routes:
 * { 
 *   path: 'admin', 
 *   canActivate: [authGuard],
 *   data: { roles: ['admin'] } 
 * }
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const modalService = inject(ModalService);
  const router = inject(Router);

  const data = route.data as AuthRouteData;
  const isLoggedIn = authService.isLoggedIn();

  // Check if authentication is required
  if (data?.requireAuth !== false && !isLoggedIn) {
    // Store return URL for redirect after login
    const returnUrl = state.url;

    const modalRef = modalService.open(Login, {
      size: 'md',
      centered: true,
      backdrop: true,
      keyboard: true,
    });

    return modalRef.afterClosed().then((result) => {
      if (result === true) {
        // User logged in successfully
        return true;
      }
      // User cancelled login, redirect to home or specified path
      return router.createUrlTree([data?.redirectTo || '/']);
    });
  }

  // Check role-based access if roles are specified
  if (data?.roles && data.roles.length > 0) {
    const hasRequiredRole = data.roles.some((role) => authService.hasRole(role));

    if (!hasRequiredRole) {
      // User doesn't have required role
      return router.createUrlTree(['/unauthorized']);
    }
  }

  return true;
};

/**
 * Role-based guard for specific roles
 * 
 * Usage:
 * { path: 'admin', canActivate: [roleGuard(['admin', 'moderator'])] }
 */
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
      return router.createUrlTree(['/'], {
        queryParams: { returnUrl: state.url }
      });
    }

    const hasRole = allowedRoles.some((role) => authService.hasRole(role));

    if (!hasRole) {
      return router.createUrlTree(['/unauthorized']);
    }

    return true;
  };
};

/**
 * Anonymous-only guard (for login/register pages)
 * Redirects authenticated users away
 */
export const anonymousGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
