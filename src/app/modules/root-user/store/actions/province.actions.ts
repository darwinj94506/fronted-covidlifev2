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
  '[Province] Update Province Error'
);

export const openModal = createAction(
  '[Province] Open Modal',
  props<{ targetHtml:any }> ()
)

export const closeModal = createAction(
  '[Province] Close Modal'
)

