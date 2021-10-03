import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Input()
  showUser = true;

  readonly user$ = this._authService.user$;

  readonly isSmallBreakpoint$ = this._breakpointOberserver.observe([Breakpoints.XSmall]).pipe(
    map(breakpointState => breakpointState.matches),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(private _authService: AuthService,
              private _breakpointOberserver: BreakpointObserver) {
  }

  logout() {
    this._authService.logout();
  }
}
