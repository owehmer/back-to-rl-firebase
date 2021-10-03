import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pickjob-uebersicht',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.scss']
})
export class EventsOverviewComponent {
  readonly isSmallBreakpoint$ = this._breakpointOberserver.observe([Breakpoints.XSmall]).pipe(
    map(breakpointState => breakpointState.matches)
  );

  constructor(private _breakpointOberserver: BreakpointObserver) {
  }
}
