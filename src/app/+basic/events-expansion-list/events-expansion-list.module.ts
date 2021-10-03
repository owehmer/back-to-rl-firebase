import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsExpansionListComponent } from './events-expansion-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { EventPipesModule } from '../pipes/event-pipes.module';
import { FirestoreDateModule } from '../../helper/pipe/firestore-date/firestore-date.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    EventsExpansionListComponent
  ],
  exports: [
    EventsExpansionListComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    EventPipesModule,
    FirestoreDateModule,
    MatDividerModule,
    MatTooltipModule
  ]
})
export class EventsExpansionListModule {
}
