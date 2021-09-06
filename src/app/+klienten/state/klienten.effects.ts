import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { KlientenFacadeService } from './klienten.facade.service';
import * as actions from './klienten.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { IKlient } from '../../../contracts/Klient';
import { Subject } from 'rxjs';


@Injectable()
export class KlientenEffects {
  readonly alleKlienten$ = createEffect(() => this.actions$.pipe(
    ofType(actions.KlientenLaden.request),
    switchMap(() => {
      const klientSubj = new Subject<IKlient[]>();

      this.store.collection<IKlient>('klient').valueChanges().pipe(
        takeUntil(this._klientenFacade.horcheAufAction$(actions.KlientenLaden.request.type))
      ).subscribe(klienten => klientSubj.next(klienten));

      return klientSubj;
    }),
    map(klienten => actions.KlientenLaden.result({ klienten })),
  ))


  constructor(private actions$: Actions,
              private _klientenFacade: KlientenFacadeService,
              private store: AngularFirestore) {
  }

}
