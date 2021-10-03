import { TestBed } from '@angular/core/testing';

import { EventsOverviewComponent } from './events-overview.component';
import { of } from 'rxjs';
import { BreakpointState } from '@angular/cdk/layout/breakpoints-observer';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EventsOverviewComponent', () => {
  async function _setup(options?: { isSmallScreen?: boolean }) {
    const mockBreakpointObs = {
      observe: () => of({ matches: options?.isSmallScreen ?? false } as BreakpointState)
    } as Partial<BreakpointObserver>;

    await TestBed.configureTestingModule({
      declarations: [EventsOverviewComponent],
      providers: [
        { provide: BreakpointObserver, useValue: mockBreakpointObs }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    const fixture = TestBed.createComponent(EventsOverviewComponent);
    const component = fixture.componentInstance;

    return { fixture, component };
  }

  it('should create', async () => {
    const { fixture, component } = await _setup();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show the small list on mobile view', async () => {
    const { fixture } = await _setup({ isSmallScreen: true });
    fixture.detectChanges();

    const htmlElem = fixture.nativeElement as HTMLElement;
    const listElem = htmlElem.querySelector('app-events-list');

    expect(listElem).not.toEqual(null);
  });

  it('should not show the small list on big screens', async () => {
    const { fixture, component } = await _setup({ isSmallScreen: false });
    fixture.detectChanges();

    const htmlElem = fixture.nativeElement as HTMLElement;
    const listElem = htmlElem.querySelector('app-events-list');

    expect(listElem).toEqual(null);
  });
});
