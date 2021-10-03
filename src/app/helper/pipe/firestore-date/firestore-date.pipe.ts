import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { Timestamp } from '../../../../contracts/firestore';

@Pipe({
  name: 'firestoreDate'
})
export class FirestoreDatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(date: Timestamp | Date, format?: string): string | undefined {
    if (date instanceof Date) {
      return formatDate(date, format || 'mediumDate', this.locale);
    }

    if (!date.seconds) {
      return undefined;
    }

    return formatDate(date.seconds * 1000, format || 'mediumDate', this.locale);
  }
}
