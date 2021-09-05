import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  readonly form = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  isLoggingIn = false;

  constructor(public auth: AngularFireAuth,
              private _router: Router,
              private _cd: ChangeDetectorRef) {
  }

  async ngOnInit() {
    await this.auth.signOut();
  }

  login() {
    this.isLoggingIn = true;
    const { email, password } = this.form.getRawValue();
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => this._router.navigate(['']))
      .catch(error => {
        let errorMsg = 'Unbekannter Fehler';
        switch (error.code) {
          case 'auth/wrong-password': {
            errorMsg = 'Benutzername oder Passwort falsch';
            break;
          }
          case 'auth/invalid-email': {
            errorMsg = 'E-Mail falsch formatiert';
            break;
          }
        }
        this.form.controls.email.setErrors({
          credentials: errorMsg
        });
        this.isLoggingIn = false;
        this._cd.markForCheck();
      });
  }
}
