import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './klienten.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { IKlient } from '../../../contracts/Klient';
import { StreamSink } from '../../helper/ngrx/stream-sink';


@Injectable()
export class KlientenEffects {
  readonly alleKlienten$ = createEffect(() => this.actions$.pipe(
    this._streamSink.automatischerFirestoreStream(actions.KlientenLaden.request),
    ofType(actions.KlientenLaden.request),
    switchMap((ac) => this.store.collection<IKlient>('klient').valueChanges().pipe(
      takeUntil(this._streamSink.holeDestroyedObs$(actions.KlientenLaden.request.type))
    )),
    map(klienten => actions.KlientenLaden.result({ klienten })),
  ))


  constructor(private actions$: Actions,
              private _streamSink: StreamSink,
              private store: AngularFirestore) {
  }

}
