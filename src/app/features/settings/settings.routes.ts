import { Routes } from '@angular/router';
import { authGuard } from '@app/core';

export const settingsRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./settings.component').then((m) => m.SettingsComponent),
    },
];
