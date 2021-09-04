import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KlientenUebersichtComponent } from './klienten-uebersicht.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { LandingPageModule } from '../landing-page/landing-page.module';


@NgModule({
  declarations: [
    KlientenUebersichtComponent
  ],
  imports: [
    CommonModule,
    LandingPageModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingPageComponent,
        children: [
          {
            path: '',
            component: KlientenUebersichtComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ]
})
export class KlientenUebersichtModule {
}
