import { Route } from '@angular/router';
import { hasRole, isAdmin } from './has-permission.guard';
import { Role } from './user.model';

interface TypedRoute extends Route {
  data?: {
    isAdmin?: boolean;
    roles?: Role[];
  };
}

export const APP_ROUTES: TypedRoute[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => isAdmin()],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasRole(['MANAGER'])],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
];
