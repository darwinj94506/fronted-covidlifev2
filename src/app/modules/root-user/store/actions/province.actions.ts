import { createAction, props } from '@ngrx/store';

export const loadProvinces = createAction(
  '[Province] Load Provinces'
);

export const loadProvincesSuccess = createAction(
  '[Province] Load Provinces Success',
  props<{ provinces: any }>()
);

export const loadProvincesError = createAction(
  '[Province] Load Province Error',
  props<{ error: any }>()
);

export const createProvince = createAction(
  '[Province] Create Province',
  props<{ province : any}>()
);

export const createProvinceSuccess = createAction(
  '[Province] Create Province Success'
);

export const createProvinceError = createAction(
  '[Province] Create Province Error',
  props<{ error: any }>()
);

export const updateProvince = createAction(
  '[Province] Update Province',
  props<{ province : any}>()
);

export const updateProvinceSuccess = createAction(
  '[Province] Update Province Success'
);

export const updateProvinceError = createAction(
  '[Province] Update Province Error',
  props<{ error: any }>()
);

export const deleteProvince = createAction(
  '[Province] Delete Province',
  props<{ province: any }>()
);

export const deleteProvinceSuccess = createAction(
  '[Province] Delete Province Success'
);

export const deleteProvinceError = createAction(
  '[Province] Delete Province Error',
  props<{error:any}>()
);

export const deleteProvinceCancel = createAction(
  '[Province] Delete Province Cancel'
);

export const openModalConfirmation = createAction(
  '[Province] Open Modal Confirmation',
  props<{ province }>()
);

export const openModalCreateUpdate = createAction(
  '[Province] Open Modal',
  props<{province:any}>()
)

export const closeModalCreateUpdate = createAction(
  '[Province] Close Modal'
) 

