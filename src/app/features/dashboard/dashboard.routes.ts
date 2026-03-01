import { Routes } from '@angular/router';
import { authGuard } from '@app/core';

export const dashboardRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./dashboard').then((m) => m.Dashboard),
    },
];
