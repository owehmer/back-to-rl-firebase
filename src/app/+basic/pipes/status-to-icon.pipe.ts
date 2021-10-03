import { Pipe, PipeTransform } from '@angular/core';
import { RlEventStatus, RlEventStatusType } from '../../../contracts/event';

@Pipe({
  name: 'statusToIcon'
})
export class StatusToIconPipe implements PipeTransform {

  transform(eventStatus: RlEventStatus | RlEventStatusType) {
    switch (eventStatus) {
      case 'CLOSED':
        return 'lock_clock';
      case 'OPEN':
        return 'schedule';
    }
    throw new Error('Invalid status provided');
  }

}
