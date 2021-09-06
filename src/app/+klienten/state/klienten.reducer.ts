import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as KlientActions from './klienten.actions';
import { KlientenLaden } from './klienten.actions';
import { IKlient } from '../../../contracts/Klient';

export const klientenFeatureKey = 'klienten';

export interface KlientState extends EntityState<IKlient> {
  // additional entities state properties
}

export const adapter: EntityAdapter<IKlient> = createEntityAdapter<IKlient>();

export const initialState: KlientState = adapter.getInitialState({
  entities: {
    '1': {
      id: '1',
      geburtsdatum: new Date(),
      nachname: 'test',
      vorname: 'asd'
    },
  },
  ids: ['1']
});


export const reducer = createReducer(
  initialState,
  on(KlientActions.addKlient,
    (state, action) => adapter.addOne(action.klient, state)
  ),
  on(KlientActions.upsertKlient,
    (state, action) => adapter.upsertOne(action.klient, state)
  ),
  on(KlientActions.addKlients,
    (state, action) => adapter.addMany(action.klients, state)
  ),
  on(KlientActions.upsertKlients,
    (state, action) => adapter.upsertMany(action.klients, state)
  ),
  on(KlientActions.updateKlient,
    (state, action) => adapter.updateOne(action.klient, state)
  ),
  on(KlientActions.updateKlients,
    (state, action) => adapter.updateMany(action.klients, state)
  ),
  on(KlientActions.deleteKlient,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(KlientActions.deleteKlients,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(KlientActions.loadKlients,
    (state, action) => adapter.setAll(action.klienten, state)
  ),
  on(KlientenLaden.result,
    (state, action) => {
      return adapter.setAll(action.payload.klienten, state);
    }
  ),
  on(KlientActions.clearKlients,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
