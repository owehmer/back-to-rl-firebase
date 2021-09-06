import { createFeatureSelector, createSelector } from '@ngrx/store';
import { klientenFeatureKey, KlientState } from './klienten.reducer';

const STATE_SELECTOR = createFeatureSelector<KlientState>(klientenFeatureKey);

export const alleKlienten = createSelector(
  STATE_SELECTOR,
  (state) => Object.values(state.entities)
);
