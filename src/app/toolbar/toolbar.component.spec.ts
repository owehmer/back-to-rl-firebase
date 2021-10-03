import { TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BreakpointState } from '@angular/cdk/layout/breakpoints-observer';

describe('ToolbarComponent', () => {
  async function _setup(options?: { isSmallScreen?: boolean }) {
    const authServiceMock = {
      user$: of({
        displayName: 'foo bar'
      })
    } as Partial<AuthService>;

    const mockBreakpointObs = {
      observe: () => of({ matches: options?.isSmallScreen ?? false } as BreakpointState)
    } as Partial<BreakpointObserver>;

    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatMenuModule], // Meh
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: BreakpointObserver, useValue: mockBreakpointObs }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(ToolbarComponent);
    const component = fixture.componentInstance;

    return { fixture, component };
  }

  it('should create', async () => {
    const { fixture, component } = await _setup();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('username is shown on a big screen', async () => {
    const { fixture, component } = await _setup({ isSmallScreen: false });
    fixture.detectChanges();

    const htmlElem = fixture.nativeElement as HTMLElement;
    const usernameElem = htmlElem.querySelector('.toolbar__user-wrapper__name');

    expect(usernameElem).toBeDefined();
  });

  it('username is hidden on a small screen', async () => {
    const { fixture, component } = await _setup({ isSmallScreen: true });
    fixture.detectChanges();

    const htmlElem = fixture.nativeElement as HTMLElement;
    const usernameElem = htmlElem.querySelector('.toolbar__user-wrapper__name');

    expect(usernameElem).toEqual(null);
  });
});
