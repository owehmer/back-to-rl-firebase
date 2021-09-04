import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BASE_ROUTES } from './routes';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(BASE_ROUTES)
  ]
})
export class AppRoutesModule {
}
