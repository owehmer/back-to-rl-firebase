import { Routes } from '@angular/router';
import { InjectionToken } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

export const PATH_AFTER_LOGIN_TOKEN = new InjectionToken<string>('path to route to after login');

export const LOGIN_ROUTE_PATH = 'login';
export const BASIC_ROUTE_PATH = 'basic';

export const BASE_ROUTES: Routes = [
  {
    path: LOGIN_ROUTE_PATH,
    loadChildren: () => import('./+login/login.module').then((m) => m.LoginModule)
  },
  {
    path: BASIC_ROUTE_PATH,
    loadChildren: () => import('./+basic/events-overview.module').then((m) => m.EventsOverviewModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(LOGIN_ROUTE_PATH)
    }
  },
  {
    path: '**',
    redirectTo: BASIC_ROUTE_PATH
  }
];
