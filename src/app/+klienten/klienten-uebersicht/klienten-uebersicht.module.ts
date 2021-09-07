import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KlientenUebersichtComponent } from './klienten-uebersicht.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from '../../landing-page/landing-page.component';
import { LandingPageModule } from '../../landing-page/landing-page.module';
import { MatCardModule } from '@angular/material/card';
import { FirestoreDateModule } from '../../helper/date/firestore-date/firestore-date.module';


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
    ]),
    MatCardModule,
    FirestoreDateModule
  ]
})
export class KlientenUebersichtModule {
}
