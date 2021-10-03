import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsOverviewComponent } from './events-overview.component';
import { RouterModule } from '@angular/router';
import { EventsListModule } from './events-list/events-list.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { EventsExpansionListModule } from './events-expansion-list/events-expansion-list.module';


@NgModule({
  declarations: [
    EventsOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EventsOverviewComponent,
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]),
    EventsListModule,
    ToolbarModule,
    EventsExpansionListModule
  ]
})
export class EventsOverviewModule {
}
