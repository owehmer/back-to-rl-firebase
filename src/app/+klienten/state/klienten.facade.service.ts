import { Injectable } from '@angular/core';
import * as selectors from './klienten.selectors';
import { StreamSink } from '../../helper/ngrx/stream-sink';
import * as actions from './klienten.actions';

@Injectable({
  providedIn: 'root'
})
export class KlientenFacadeService {
  constructor(private _sink: StreamSink) {
  }

  holeAlleKlienten$(idFilter?: string[]) {
    return this._sink.starteStream$(() => actions.KlientenLaden.request({ idFilter }), selectors.alleKlienten);
  }

  stoppeAlleKlientenAnzeigen() {
    this._sink.stoppeStream(actions.KlientenLaden.request.type);
  }
}
