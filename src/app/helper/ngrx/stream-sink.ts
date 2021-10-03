import { Dictionary } from '@ngrx/entity';
import { Observable, OperatorFunction, pipe, Subject } from 'rxjs';
import { AssertNonNull } from '../assert/not-null';
import { ActionCreator, Selector, Store } from '@ngrx/store';
import { Action } from 'ts-action';
import { Injectable } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export class SinkObj<TState = unknown, TResult = unknown> {
  get destroyed$() {
    return this._destroyed$.asObservable();
  }

  get anzahlListener() {
    return this._anzahlListener;
  }

  private _anzahlListener = 0;
  private readonly _destroyed$ = new Subject<void>();

  constructor(public actionName: string,
              public storeSelektor: Selector<TState, TResult>) {
  }

  fuegeListenerHinzu() {
    this._anzahlListener++;
  }

  stoppeListener() {
    this._anzahlListener--;

    if (this._anzahlListener === 0) {
      this._destroyed$.next();
      this._destroyed$.complete();
    }
  }
}


@Injectable({ providedIn: 'root' })
export class StreamSink<TState = any> {
  private _selektorMetas: Dictionary<SinkObj<TState, any>> = {};

  constructor(protected _ngrxStore: Store<TState>,
              private _firestore: AngularFirestore) {
  }

  automatischerFirestoreStream<TStoreContract extends object, AC extends ActionCreator = ActionCreator>(
    action: AC,
    storePath: string
  ): OperatorFunction<Action, TStoreContract[]> {
    return this.automatischerStream(action, this._firestore.collection<TStoreContract>(storePath).valueChanges());
  }

  automatischerStream<AC extends ActionCreator, TStoreContract extends object>(
    action: AC,
    valueChangesObs$: Observable<TStoreContract[]>
  ): OperatorFunction<Action, TStoreContract[]> {
    return pipe(
      ofType(action),
      switchMap(() => valueChangesObs$.pipe(
        takeUntil(this._holeDestroyedObs$(action.type))
      ))
    )
  }

  starteStream$<TSelektorResult, TAction extends Action>(
    actionFn: () => TAction,
    storeSelektor: Selector<TState, TSelektorResult>
  ) {
    const action = actionFn() as Action;
    const sinkObj = this._holeOderErstelleSink(action.type, storeSelektor);
    sinkObj.fuegeListenerHinzu();

    this._ngrxStore.dispatch(action);

    return this._ngrxStore.select(storeSelektor);
  }

  stoppeStream(name: string) {
    const selektorData = this._selektorMetas[name];
    AssertNonNull(selektorData);

    selektorData.stoppeListener();
    if (selektorData.anzahlListener === 0) {
      this._selektorMetas[name] = undefined;
    }
  }

  /**
   * Methode für die Pipes um sich ihr entsprechendes Subject zu holen
   * @param actionName
   */
  private _holeDestroyedObs$(actionName: string): Observable<void> {
    const selektorMeta = this._selektorMetas[actionName];

    AssertNonNull(selektorMeta, 'Ein Service muss die Sink erst erstellen, bevor sie in dem Effect genutzt werden kann!');

    return selektorMeta.destroyed$;
  }

  /**
   *
   * @param name
   * @param storeSelektor
   * @private
   */
  private _holeOderErstelleSink<TSelektor extends Selector<TState, TSelektorResult>, TSelektorResult>(name: string, storeSelektor: TSelektor) {
    if (this._selektorMetas[name] == null) {
      this._selektorMetas[name] = new SinkObj(name, storeSelektor);
    }

    const selektor = this._selektorMetas[name];
    AssertNonNull(selektor);

    return selektor;
  }
}
