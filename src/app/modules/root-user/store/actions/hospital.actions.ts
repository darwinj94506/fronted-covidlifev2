

import { createAction, props } from '@ngrx/store';
import { IHospitalEntity } from '../../../../core/domain/entities';

export const cargarHospitales = createAction(
  '[Hospital] Cargar Hospitales',
  props<{ idEspacio: String | number }>()
);

export const cargarHospitalesExito = createAction(
  '[Hospital] Cargar Hospitales Éxito',
  props<{ Hospitales: IHospitalEntity[] }>()
);

export const cargarHospitalesError = createAction(
  '[Hospital] Cargar Hospital Error',
  props<{ error: string }>()
);

export const crearHospital = createAction(
  '[Hospital] Crear Hospital',
  props<{ Hospital : IHospitalEntity}>()
);

export const crearHospitalExito = createAction(
  '[Hospital] Crear Hospital Éxito',
  props<{ Hospital : IHospitalEntity}>()
);

export const crearHospitalError = createAction(
  '[Hospital] Crear Hospital Error',
  props<{ error: string }>()
);

export const actualizarHospital = createAction(
  '[Hospital] Actualizar Hospital',
  props<{ Hospital : IHospitalEntity}>()
);

export const actualizarHospitalExito = createAction(
  '[Hospital] Actualizar Hospital Éxito',
  props<{ Hospital : IHospitalEntity}>()
);

export const actualizarHospitalError = createAction(
  '[Hospital] Actualizar Hospital Error',
  props<{ error: string }>()
);

export const eliminarHospital = createAction(
  '[Hospital] Eliminar Hospital',
  props<{ Hospital: IHospitalEntity }>()
);

export const eliminarHospitalExito = createAction(
  '[Hospital] Eliminar Hospital Éxito',
  props<{ Hospital : IHospitalEntity}>()
);

export const eliminarHospitalError = createAction(
  '[Hospital] Elimniar Hospital Error',
  props<{error: string}>()
);

export const eliminarHospitalCancelar = createAction(
  '[Hospital] Eliminar Hospital Cancelar'
);

export const abrirModalConfirmacion = createAction(
  '[Hospital] Abrir Modal Confirmacion',
  props<{ Hospital: IHospitalEntity }>()
);

export const abrirModalCreateUpdate = createAction(
  '[Hospital] Abrir Modal Create Update',
  props<{Hospital: IHospitalEntity}>()
)

export const cerrarModalCreateUpdate = createAction(
  '[Hospital] Cerrar Modal Create Update'
) 

