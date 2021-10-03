import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/compat';
import { isFirebaseError } from '../helper/type-guard/is-firebase-error';
import { errorCodeToReadableString } from './error-code-readable';
import { PATH_AFTER_LOGIN_TOKEN } from '../app.routes';
import FirebaseError = firebase.FirebaseError;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  readonly form = new FormGroup({
    email: new FormControl('some@one.com'),
    password: new FormControl('')
  });

  isLoggingIn = false;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _cd: ChangeDetectorRef,
              @Inject(PATH_AFTER_LOGIN_TOKEN) private _loginSuccessPath: string) {
  }

  async ngOnInit() {
    await this._authService.logout();
  }

  login() {
    this.isLoggingIn = true;

    const { email, password } = this.form.getRawValue();

    return this._authService.loginWithMail(email, password)
      .then(() => this._router.navigate([this._loginSuccessPath]))
      .catch((error: FirebaseError | Error) => {
        this._displayErrorMessage(error);

        this.isLoggingIn = false;
        this._cd.markForCheck();
      });
  }

  private _displayErrorMessage(error: FirebaseError | Error) {
    const errorCode = isFirebaseError(error) ? error.code : undefined;

    this.form.controls.email.setErrors({
      credentials: errorCodeToReadableString(errorCode)
    });
  }
}
