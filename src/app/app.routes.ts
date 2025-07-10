import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./features/pages/home/home').then(m => m.Home),
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./features/pages/list/list').then(m => m.List)
      },
      {
        path: 'list/new',
        loadComponent: () =>
          import('./features/pages/new/new').then(m => m.New)
      },
      {
        path: 'list/:id/edit',
        loadComponent: () =>
          import('./features/pages/edit/edit').then(m => m.Edit)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
