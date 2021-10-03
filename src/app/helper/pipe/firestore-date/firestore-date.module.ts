import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDatePipe } from './firestore-date.pipe';


@NgModule({
  declarations: [
    FirestoreDatePipe
  ],
  exports: [
    FirestoreDatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class FirestoreDateModule {
}
