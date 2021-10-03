import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { shareReplay, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { LOGIN_ROUTE_PATH } from '../app.routes';

@Injectable()
export class AuthService {
  readonly user$ = this._auth.user;

  readonly userJwt$ = this.user$.pipe(
    switchMap(user => user?.getIdToken?.() ?? of(undefined)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _auth: AngularFireAuth,
              private _router: Router) {
  }

  loginWithMail(email: string, password: string) {
    return this._auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return this._auth.signOut().then(() => {
      this._router.navigate([LOGIN_ROUTE_PATH]);
    });
  }
}
