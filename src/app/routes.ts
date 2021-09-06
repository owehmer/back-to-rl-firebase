import { Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

export const BASE_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: '',
    loadChildren: () => import('./+klienten/klienten-uebersicht/klienten-uebersicht.module').then((m) => m.KlientenUebersichtModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo('login')
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
