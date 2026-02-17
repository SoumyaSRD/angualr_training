import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Login } from '../../components/auth/login/login';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const dialog = inject(MatDialog);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return of(true);
  }

  const dialogRef = dialog.open(Login, {
    width: '420px',
    maxWidth: '90vw',
    disableClose: false,
    autoFocus: false,
    restoreFocus: true,
  });

  return dialogRef.afterClosed().pipe(
    map((result) => (result === true ? true : router.createUrlTree(['/'])))
  );
};
