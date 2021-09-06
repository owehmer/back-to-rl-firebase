import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromKlienten from './klienten.reducer';
import { EffectsModule } from '@ngrx/effects';
import { KlientenEffects } from './klienten.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromKlienten.klientenFeatureKey, fromKlienten.reducer),
    EffectsModule.forFeature([KlientenEffects])
  ]
})
export class KlientenStateModule {
}
