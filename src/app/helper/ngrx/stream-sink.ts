import { Dictionary } from '@ngrx/entity';
import { Subject } from 'rxjs';
import { NonNull } from '../assert/not-null';
import { Store } from '@ngrx/store';
import { Action } from 'ts-action';
import { MemoizedSelector } from '@ngrx/store/src/selector';

export class StreamSink {
  private _selektorMetas: Dictionary<{
    subj: Subject<void>;
    anzahlListener: number;
    storeSelektor: MemoizedSelector<unknown, unknown>;
  }> = {};

  private _selektorGeaendert$ = new Subject<void>();

  constructor(protected _store: Store) {
  }


  public horcheAufAction$(name: string): Subject<void> {
    const selektorMeta = this._selektorMetas[name];
    NonNull(selektorMeta);
    return selektorMeta.subj;
  }

  protected _subscribeSelektor<TAction extends Action, TSelektor extends MemoizedSelector<any, any>>(actionFn: () => TAction, storeSelektor: TSelektor) {
    const action = actionFn() as Action;
    this.erstelleSubject(action.type, storeSelektor);
    this._store.dispatch(action);
    return this._store.select(storeSelektor);
  }

  protected _unsubscribeSelektor(name: string) {
    const selektorData = this._selektorMetas[name];
    NonNull(selektorData);

    selektorData.anzahlListener--;

    if (selektorData.anzahlListener === 0) {
      selektorData.subj.next();
      selektorData.subj.complete();
      this._selektorMetas[name] = undefined;
    }
  }

  private erstelleSubject<TSelektor extends MemoizedSelector<any, any>>(name: string, storeSelektor: TSelektor): void {
    if (this._selektorMetas[name] == null) {
      this._selektorMetas[name] = {
        subj: new Subject<void>(),
        anzahlListener: 0,
        storeSelektor
      }
    }
    const selektor = this._selektorMetas[name];
    NonNull(selektor);
    selektor.anzahlListener++;
  }
}
