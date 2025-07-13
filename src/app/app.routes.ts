import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
    pathMatch: 'full'
  },
  {
    path: 'empleados',
    loadComponent: () => import('./modules/empleados/empleados.component').then(m => m.EmpleadosComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
