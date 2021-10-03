import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventService } from '../service/event.service';
import { EventGroup } from '../service/event.models';
import { MatExpansionPanel } from '@angular/material/expansion';
import { RlEvent } from '../../../contracts/event';

@Component({
  selector: 'app-events-expansion-list',
  templateUrl: './events-expansion-list.component.html',
  styleUrls: ['./events-expansion-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsExpansionListComponent {
  readonly eventUserMapping = {
    '=1': 'User',
    'other': 'Users'
  }

  readonly eventGroups$ = this._eventService.eventGroups$;

  constructor(private _eventService: EventService) {
  }

  trackByEventId(_: number, event: RlEvent) {
    return event.id;
  }

  trackByGroupKey(_: number, group: EventGroup) {
    return group.key;
  }

  imgAltText(eventPictureTitle: string) {
    return `Image of ${eventPictureTitle}`
  }

  panelHeaderClicked(panel: MatExpansionPanel, event: RlEvent) {
    this._eventService.setNextStatus(event);
    this.matExpansionToggle(panel);
  }

  matExpansionToggle(panel: MatExpansionPanel, event?: Event) {
    if (event !== undefined) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    // A bit hackey but the click event gets caught somewhere deep
    panel.expanded = !panel.expanded;
  }

}
