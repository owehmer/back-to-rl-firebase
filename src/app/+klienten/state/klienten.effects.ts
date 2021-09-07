import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import * as actions from './klienten.actions';
import { map } from 'rxjs/operators';
import { IKlient } from '../../../contracts/Klient';
import { StreamSink } from '../../helper/ngrx/stream-sink';


@Injectable()
export class KlientenEffects {
  readonly alleKlienten$ = createEffect(() => this.actions$.pipe(
    this._streamSink.automatischerFirestoreStream<IKlient>(actions.KlientenLaden.request, 'klient'),
    map(klienten => actions.KlientenLaden.result({ klienten })),
  ))


  constructor(private actions$: Actions,
              private _streamSink: StreamSink) {
  }

}
