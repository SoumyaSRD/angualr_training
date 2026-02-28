import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { Login } from '../../components/auth/login/login';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const modalService = inject(ModalService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return of(true);
  }

  const modalRef = modalService.open(Login, {
    size: 'md',
    centered: true,
    backdrop: true,
    keyboard: true,
  });

  return modalRef.afterClosed().then(
    (result) => (result === true ? true : router.createUrlTree(['/']))
  );
};
