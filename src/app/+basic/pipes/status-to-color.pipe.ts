import { Pipe, PipeTransform } from '@angular/core';
import { RlEventStatus, RlEventStatusType } from '../../../contracts/event';

@Pipe({
  name: 'statusToColor'
})
export class StatusToColorPipe implements PipeTransform {

  transform(eventStatus: RlEventStatus | RlEventStatusType) {
    switch (eventStatus) {
      case 'OPEN':
        return 'rgb(241 91 80)';
      case 'CLOSED':
        return 'rgb(110 179 53)';

    }
    throw new Error('Invalid status provided');
  }

}
