import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BASE_ROUTES } from './app.routes';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(BASE_ROUTES, {
      enableTracing: !environment.production
    })
  ]
})
export class AppRoutesModule {
}
