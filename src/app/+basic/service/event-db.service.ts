import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RlEvent } from '../../../contracts/event';

@Injectable({
  providedIn: 'root'
})
export class EventDbService {
  readonly events$ = this._store.collection<RlEvent>('event').valueChanges().pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private _store: AngularFirestore) {
  }
}
