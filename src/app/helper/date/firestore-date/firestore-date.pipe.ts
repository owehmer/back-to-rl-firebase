import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { Timestamp } from '../../../../contracts/firestore';

@Pipe({
  name: 'firestoreDate'
})
export class FirestoreDatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform({ seconds, nanoseconds }: Timestamp, format?: string): string | undefined {
    if (!seconds) {
      return undefined;
    }

    return formatDate(seconds * 1000, format || 'medium', this.locale);
  }
}
