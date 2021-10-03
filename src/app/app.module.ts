import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { AppRoutesModule } from './app-routes.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth/auth.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { HttpAuthInterceptor } from './helper/interceptor/http-auth.interceptor';
import { HttpErrorMessageInterceptor } from './helper/interceptor/http-error-message-interceptor';
import { BASIC_ROUTE_PATH, PATH_AFTER_LOGIN_TOKEN } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AppRoutesModule,
    RouterModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    { provide: PERSISTENCE, useValue: 'local' },
    { provide: PATH_AFTER_LOGIN_TOKEN, useValue: BASIC_ROUTE_PATH },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {
        appearance: 'outline'
      } as MatFormFieldDefaultOptions
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorMessageInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
