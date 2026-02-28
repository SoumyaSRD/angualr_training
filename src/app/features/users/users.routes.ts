import { Routes } from '@angular/router';
import { authGuard } from '@app/core';

export const usersRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./users.component').then((m) => m.UsersComponent),
    },
    {
        path: ':id',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./user-detail.component').then((m) => m.UserDetailComponent),
    },
];
