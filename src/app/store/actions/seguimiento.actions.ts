import { createAction, props } from '@ngrx/store';
import { SolicitarSeguimientoOut } from '../../core/domain/outputs';
import { SolicitarSeguimientoIn } from '../../core/domain/inputs';

export const createSeguimiento = createAction(
  '[Seguimiento] Create Seguimiento',
  props<{ seguimientoIn: SolicitarSeguimientoIn }>()
)

export const createSeguimientoSuccess = createAction(
  '[Seguimiento] Create Seguimiento Success',
  props<{ seguimientoOut: SolicitarSeguimientoOut }>()
)

export const createSeguimientoError = createAction(
  '[Seguimiento] Create Seguimiento Error',
  props<{ error: String }>()
)


