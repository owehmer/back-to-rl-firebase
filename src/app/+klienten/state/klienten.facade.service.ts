import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from './klienten.selectors';
import { StreamSink } from '../../helper/ngrx/stream-sink';
import * as actions from './klienten.actions';

@Injectable({
  providedIn: 'root'
})
export class KlientenFacadeService {

  constructor(private _store: Store,
              private _sink: StreamSink) {
  }

  gibAlleKlienten$(idFilter?: string[]) {
    const a = selectors.alleKlienten;
    const b = this._sink.starteStream$(() => actions.KlientenLaden.request({ idFilter }), a);

  }

  stoppeAlleKlientenAnzeigen() {
    this._unsubscribeSelektor(actions.KlientenLaden.request.type);
  }

  ladeAlleKlienten$() {

  }
}
