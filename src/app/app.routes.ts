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
    path: 'departamentos',
    loadComponent: () => import('./modules/departamentos/departamentos.component').then(m => m.DepartamentosComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
