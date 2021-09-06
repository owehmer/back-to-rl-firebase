import { ActionGenerator } from '../../helper/ngrx/action-generator';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IKlient } from '../../../contracts/Klient';

export const KlientenLaden = ActionGenerator<{ idFilter?: string[] }, { klienten: IKlient[] }>('Klienten', 'Laden');

// created by schematic

export const loadKlients = createAction(
  '[Klient/API] Load Klients',
  props<{ klienten: IKlient[] }>()
);

export const addKlient = createAction(
  '[Klient/API] Add Klient',
  props<{ klient: IKlient }>()
);

export const upsertKlient = createAction(
  '[Klient/API] Upsert Klient',
  props<{ klient: IKlient }>()
);

export const addKlients = createAction(
  '[Klient/API] Add Klients',
  props<{ klients: IKlient[] }>()
);

export const upsertKlients = createAction(
  '[Klient/API] Upsert Klients',
  props<{ klients: IKlient[] }>()
);

export const updateKlient = createAction(
  '[Klient/API] Update Klient',
  props<{ klient: Update<IKlient> }>()
);

export const updateKlients = createAction(
  '[Klient/API] Update Klients',
  props<{ klients: Update<IKlient>[] }>()
);

export const deleteKlient = createAction(
  '[Klient/API] Delete Klient',
  props<{ id: string }>()
);

export const deleteKlients = createAction(
  '[Klient/API] Delete Klients',
  props<{ ids: string[] }>()
);

export const clearKlients = createAction(
  '[Klient/API] Clear Klients'
);
