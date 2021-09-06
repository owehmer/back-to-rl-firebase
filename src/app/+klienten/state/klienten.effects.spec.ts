import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { KlientenEffects } from './klienten.effects';

describe('KlientenEffects', () => {
  let actions$: Observable<any>;
  let effects: KlientenEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KlientenEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(KlientenEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
