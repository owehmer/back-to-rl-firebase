import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import * as actions from './klienten.actions';
import { catchError, map } from 'rxjs/operators';
import { IKlient } from '../../../contracts/Klient';
import { StreamSink } from '../../helper/ngrx/stream-sink';
import { of } from 'rxjs';


@Injectable()
export class KlientenEffects {
  readonly alleKlienten$ = createEffect(() => this.actions$.pipe(
    this._streamSink.automatischerFirestoreStream<IKlient>(actions.KlientenLaden.request, 'klient'),
    map(klienten => actions.KlientenLaden.result({ klienten })),
    catchError(error => of(actions.KlientenLaden.error(error)))
  ))


  constructor(private actions$: Actions,
              private _streamSink: StreamSink) {
  }

}
