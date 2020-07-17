import { createAction, props } from '@ngrx/store';
import { IEspacioEntity } from '../../../../core/domain/entities';
import { EspacioEnum } from '../../../../core/domain/enums';

export const cargarEspacios = createAction(
  '[Espacio] Cargar Espacios',
  props<{ tipo: EspacioEnum , idTipo: string | number  }>()
);

export const cargarEspacioExito = createAction(
  '[Espacio] Cargar Espacios Éxito',
  props<{ espacios: IEspacioEntity[], tipo: EspacioEnum }>()
);

export const cargarEspacioError = createAction(
  '[Espacio] Cargar Espacio Error',
  props<{ error: string,  tipo: EspacioEnum }>()
);

export const crearEspacio = createAction(
  '[Espacio] Crear Espacio',
  props<{ Espacio : IEspacioEntity}>()
);

export const crearEspacioExito = createAction(
  '[Espacio] Crear Espacio Éxito',
  props<{ Espacio : IEspacioEntity}>()
);

export const crearEspacioError = createAction(
  '[Espacio] Crear Espacio Error',
  props<{ error: string, Espacio : IEspacioEntity }>()
);

export const actualizarEspacio = createAction(
  '[Espacio] Actualizar Espacio',
  props<{ Espacio : IEspacioEntity}>()
);

export const actualizarEspacioExito = createAction(
  '[Espacio] Actualizar Espacio Éxito',
  props<{ Espacio : IEspacioEntity}>()
);

export const actualizarEspacioError = createAction(
  '[Espacio] Actualizar Espacio Error',
  props<{ error: string, Espacio : IEspacioEntity}>()
);

export const eliminarEspacio = createAction(
  '[Espacio] Eliminar Espacio',
  props<{ Espacio: IEspacioEntity }>()
);

export const eliminarEspacioExito = createAction(
  '[Espacio] Eliminar Espacio Éxito',
  props<{ Espacio : IEspacioEntity}>()
);

export const eliminarEspacioError = createAction(
  '[Espacio] Elimniar Espacio Error',
  props<{error: string,  Espacio : IEspacioEntity}>()
);

export const eliminarEspacioCancelar = createAction(
  '[Espacio] Eliminar Espacio Cancelar'
);

export const abrirModalConfirmacon = createAction(
  '[Espacio] Abrir Modal Confirmacion',
  props<{ Espacio: IEspacioEntity }>()
);

export const abrirModalCreateUpdate = createAction(
  '[Espacio] Abrir Modal Create Update',
  props<{Espacio: IEspacioEntity}>()
)

export const cerrarModalCreateUpdate = createAction(
  '[Espacio] Cerrar Modal Create Update'
) 

