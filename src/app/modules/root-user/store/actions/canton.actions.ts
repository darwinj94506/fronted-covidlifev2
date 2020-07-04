import { createAction, props } from '@ngrx/store';

export const loadCantons = createAction(
  '[Canton] Load Cantons'
);

export const loadCantosSuccess = createAction(
  '[Canton] Load Cantons Success',
  props<{ cantons: any }>()
);

export const loadCantonsError = createAction(
  '[Canton] Load Canton Error',
  props<{ error: any }>()
);

//

export const loadCanton = createAction(
    '[Canton] Load Canton'
);

export const loadCantonSuccess = createAction(
    '[Canton] Load Canton Success',
    props<{ canton: any}>()
);

export const loadCantonError = createAction(
    '[Canton] Load Canton Error',
    props<{ error: any }>()
);

//
//  export const 


