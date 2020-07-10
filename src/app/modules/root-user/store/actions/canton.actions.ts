import { createAction, props } from '@ngrx/store';

export const loadCantons = createAction(
  '[Canton] Load Cantons'
);

export const loadCantonsSuccess = createAction(
  '[Canton] Load Cantons Success',
  props<{ cantons: any }>()
);

export const loadCantonsError = createAction(
  '[Canton] Load Cantons Error',
  props<{ error: any }>()
);

export const createCanton = createAction(
  '[Canton] Create Canton',
  props<{ canton : any}>()
);

export const createCantonSuccess = createAction(
  '[Canton] Create Canton Success'
);

export const createCantonError = createAction(
  '[Canton] Create Canton Error',
  props<{ error: any }>()
);

export const updateCanton = createAction(
  '[Canton] Update Canton',
  props<{ canton : any}>()
);

export const updateCantonSuccess = createAction(
  '[Canton] Update Canton Success'
);

export const updateCantonError = createAction(
  '[Canton] Update Canton Error',
  props<{ error: any }>()
);

export const deleteCanton = createAction(
  '[Canton] Delete Canton',
  props<{ canton: any }>()
);

export const deleteCantonSuccess = createAction(
  '[Canton] Delete Canton Success'
);

export const deleteCantonError = createAction(
  '[Canton] Delete Canton Error',
  props<{error:any}>()
);

export const deleteCantonCancel = createAction(
  '[Canton] Delete Canton Cancel'
);

export const openModalConfirmation = createAction(
  '[Canton] Open Modal Confirmation',
  props<{ canton }>()
);

export const openModalCreateUpdate = createAction(
  '[Canton] Open Modal',
  props<{canton:any}>()
)

export const closeModalCreateUpdate = createAction(
  '[Canton] Close Modal'
) 

