import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  readonly form = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(public auth: AngularFireAuth) {
  }

  async ngOnInit() {
    await this.auth.signOut();
  }

  login() {
    const { email, password } = this.form.getRawValue();
    this.auth.signInWithEmailAndPassword(email, password)
      .then(credentials => {
        console.warn('SUCCESS', credentials);
      }).catch(error => {
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
      })
    });
  }
}
