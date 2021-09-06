import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from './klienten.selectors';
import { StreamSink } from '../../helper/ngrx/stream-sink';
import * as actions from './klienten.actions';

@Injectable({
  providedIn: 'root'
})
export class KlientenFacadeService extends StreamSink {
  alleKlienten$ = this._store.select(selectors.alleKlienten);

  constructor(_store: Store) {
    super(_store);
  }

  gibAlleKlienten$(idFilter?: string[]) {
    return this._subscribeSelektor(() => actions.KlientenLaden.request({ idFilter }), selectors.alleKlienten);
  }

  stoppeAlleKlientenAnzeigen() {
    this._unsubscribeSelektor(actions.KlientenLaden.request.type);
  }

  ladeAlleKlienten$() {

  }
}
