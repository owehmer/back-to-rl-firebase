import { Component, OnInit } from '@angular/core';
import { KlientenFacadeService } from '../state/klienten.facade.service';
import { map } from 'rxjs/operators';
import { AssertNonNull } from '../../helper/assert/not-null';

@Component({
  selector: 'app-klienten-uebersicht',
  templateUrl: './klienten-uebersicht.component.html',
  styleUrls: ['./klienten-uebersicht.component.scss']
})
export class KlientenUebersichtComponent implements OnInit {
  readonly klienten$ = this._klientenFacade.holeAlleKlienten$().pipe(
    map(klienten => Object.values(klienten).map(k => {
      AssertNonNull(k);
      return k;
    }))
  );

  constructor(private _klientenFacade: KlientenFacadeService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._klientenFacade.stoppeAlleKlientenAnzeigen();
  }

}
