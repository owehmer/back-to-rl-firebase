import { Component, OnInit } from '@angular/core';
import { KlientenFacadeService } from '../state/klienten.facade.service';
import { map, tap } from 'rxjs/operators';
import { NonNull } from '../../helper/assert/not-null';

@Component({
  selector: 'app-klienten-uebersicht',
  templateUrl: './klienten-uebersicht.component.html',
  styleUrls: ['./klienten-uebersicht.component.scss']
})
export class KlientenUebersichtComponent implements OnInit {
  readonly klienten$ = this._klientenFacade.alleKlienten$.pipe(
    map(klienten => Object.values(klienten).map(k => {
      NonNull(k);
      return k;
    }))
  );

  storeObs$: any;

  start = false;

  constructor(private _klientenFacade: KlientenFacadeService) {
  }

  ngOnInit(): void {
  }

  startSub() {
    this.start = true;
    this.storeObs$ = this._klientenFacade.gibAlleKlienten$().pipe(
      tap(klienten => {
        console.warn('KK', klienten);
      })
    );
  }

  stopSub() {
    this._klientenFacade.stoppeAlleKlientenAnzeigen();
  }

}
