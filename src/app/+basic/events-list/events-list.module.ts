import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './events-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { EventPipesModule } from '../pipes/event-pipes.module';
import { FirestoreDateModule } from '../../helper/pipe/firestore-date/firestore-date.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatLineModule } from '@angular/material/core';


@NgModule({
  declarations: [
    EventsListComponent
  ],
  exports: [
    EventsListComponent
  ],
  imports: [
    CommonModule,
    EventPipesModule,
    MatListModule,
    MatIconModule,
    FirestoreDateModule,
    MatTooltipModule,
    MatLineModule
  ]
})
export class EventsListModule {
}
