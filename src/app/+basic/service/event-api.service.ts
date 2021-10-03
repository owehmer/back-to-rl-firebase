import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const EVENTS_API_URL = '/api/events/';

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  private _cancelModifyRequest$ = new Subject<void>();

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Calls the modify event API
   * Interrupts running patch calls
   * @param eventId
   */
  modify(eventId: string) {
    this._cancelModifyRequest$.next();

    return this._httpClient.patch(EVENTS_API_URL + eventId, undefined).pipe(
      takeUntil(this._cancelModifyRequest$)
    );
  }
}
