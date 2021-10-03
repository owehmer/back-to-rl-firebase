import { Pipe, PipeTransform } from '@angular/core';
import { RlEventStatus, RlEventStatusType } from '../../../contracts/event';

@Pipe({
  name: 'statusToInfotext'
})
export class StatusToInfotextPipe implements PipeTransform {

  transform(eventStatus: RlEventStatus | RlEventStatusType) {
    switch (eventStatus) {
      case 'OPEN':
        return 'Open';
      case 'CLOSED':
        return 'Done';
    }
    throw new Error('Invalid status provided');
  }

}
