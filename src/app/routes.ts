import { Routes } from '@angular/router';

export const BASE_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: '',
    loadChildren: () => import('./klienten-uebersicht/klienten-uebersicht.module').then((m) => m.KlientenUebersichtModule)
  }
];
