import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventService } from '../service/event.service';
import { EventGroup } from '../service/event.models';
import { RlEvent } from '../../../contracts/event';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsListComponent {
  readonly eventUserMapping = {
    '=1': 'User',
    'other': 'Users'
  }

  readonly eventGroups$ = this._eventService.eventGroups$;

  constructor(private _eventService: EventService) {
  }

  trackByItemId(_: number, event: RlEvent) {
    return event.id;
  }

  trackByGroupKey(_: number, group: EventGroup) {
    return group.key;
  }

  setNextStatus(event: RlEvent) {
    this._eventService.setNextStatus(event);
  }
}
