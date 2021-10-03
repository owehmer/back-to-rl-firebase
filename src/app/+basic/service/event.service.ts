import { Injectable } from '@angular/core';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { getNextStatusClient, groupEventsByStatus } from './event.functions';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { simpleArrayMergeUpdate } from '../../helper/array/simple-merge';
import { EventGroup } from './event.models';
import { EventApiService } from './event-api.service';
import { EventDbService } from './event-db.service';
import { RlEvent } from '../../../contracts/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  readonly eventGroups$: Observable<EventGroup[] | undefined>;

  private _optimisticUpdatedEvents$ = new BehaviorSubject<RlEvent[]>([]);

  constructor(private _eventApiService: EventApiService,
              private _eventDbService: EventDbService) {


    const eventsFromDb$ = this._eventDbService.events$.pipe(
      tap(events => this._removeSucessfullyPatchedEvents(events))
    );

    this.eventGroups$ = combineLatest([
      eventsFromDb$,
      this._optimisticUpdatedEvents$
    ]).pipe(
      map(([eventsFromStore, eventsUpdated]) => simpleArrayMergeUpdate(eventsFromStore, eventsUpdated, (store, updated) => store.id === updated.id)),
      map(groupEventsByStatus),
      shareReplay({ bufferSize: 1, refCount: true })
    )
  }

  /**
   * Set the next status for an event
   * this will optimistically update the event
   * @param event
   */
  setNextStatus(event: RlEvent) {
    this._optimisticUpdateEvent(event);

    this._eventApiService.modify(event.id).pipe(
      catchError(error => {
        // If there is an error we can remove the item from the list as it won't be updated
        const cleanedList = this._optimisticUpdatedEvents$
          .value
          .filter(item => item.id !== event.id);

        this._optimisticUpdatedEvents$.next(cleanedList);
        throw error;
      })
    ).subscribe();
  }

  /**
   * Creates an optimistic version of the event and appends it to the
   * optimistic event list
   * @param event
   * @private
   */
  private _optimisticUpdateEvent(event: RlEvent) {
    const cleanedList = this._optimisticUpdatedEvents$
      .value
      .filter((item) => item.id !== event.id);

    cleanedList.push({
      ...event,
      status: getNextStatusClient(event)
    });

    this._optimisticUpdatedEvents$.next(cleanedList);
  }

  /**
   * Remove all given events from the optimistic item list
   * this is useful when our DB updates in order to remove dublicates / sucessfully updated events
   * @param allCurrentEvents
   * @private
   */
  private _removeSucessfullyPatchedEvents(allCurrentEvents: readonly RlEvent[]) {
    allCurrentEvents.forEach(event => {
      const optimisticItems = this._optimisticUpdatedEvents$.value;
      const cleanList = optimisticItems
        .filter((item) => item.id !== event.id && item.status !== event.status);

      if (cleanList.length !== optimisticItems.length) {
        this._optimisticUpdatedEvents$.next(cleanList);
      }
    });
  }
}
