import { Pipe, PipeTransform } from '@angular/core';
import { eventStatusToPrioMap } from '../service/event.models';
import { RlEvent } from '../../../contracts/event';

@Pipe({
  name: 'sortByStatus'
})

export class SortByStatusPipe implements PipeTransform {

  /**
   * Sorts the events in the following order:
   * 1. status (open, closed)
   * 2. if the status is the same: Priority (numberwise lower prios will be sorted to the top)
   * @param events
   */
  transform(events: readonly RlEvent[] | undefined | null): RlEvent[] {
    if (events == null) {
      return [];
    }

    const eventsClone = [...events];

    return eventsClone.sort((eventA, eventB) => {
      if (eventA.status === eventB.status) {
        return eventA.priority - eventB.priority;
      }
      return eventStatusToPrioMap[eventA.status] - eventStatusToPrioMap[eventB.status];
    });
  }

}
