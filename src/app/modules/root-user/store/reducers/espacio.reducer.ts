import { Action, createReducer, on } from '@ngrx/store';
import { IEspacioEntity } from '../../../../core/domain/entities'
import * as accionesEspacio  from '../actions/espacio.actions';
import { EspacioEnum } from '../../../../core/domain/enums';
export interface EspacioState {
  provincias: IEspacioEntity [];
  cantones: IEspacioEntity [];
  parroquias: IEspacioEntity [];
  isLoadingProvincias: boolean;
  isLoadingCantones: boolean;
  isLoadingParroquias: boolean;

}

export const initialState: EspacioState = {
  provincias: [],
  cantones:  [],
  parroquias:  [],
  isLoadingProvincias: false,
  isLoadingCantones: false,
  isLoadingParroquias: false
};

const espacioReducer = createReducer(
  initialState,
  on(accionesEspacio.cargarEspacios, (state, payload) => {
    switch(payload.tipo){
        case EspacioEnum.PROVINCIA :
            return { ...state, isLoadingProvincias:true }
        case EspacioEnum.CANTON :
            return { ...state, isLoadingCantones:true }
        case EspacioEnum.PARROQUIA :
            return { ...state, isLoadingParroquias:true}
    }
  }), 
  on(accionesEspacio.cargarEspacioExito, (state, payload) => {
    switch(payload.tipo){
        case EspacioEnum.PROVINCIA :
            return { ...state, isLoadingProvincias:false, provincias: payload.espacios }
        case EspacioEnum.CANTON :
            return { ...state, isLoadingCantones:false, cantones: payload.espacios }
        case EspacioEnum.PARROQUIA :
            return { ...state, isLoadingParroquias:false, parroquias: payload.espacios}
    }
  }),
  on(accionesEspacio.cargarEspacioError, (state, payload) => {
    switch(payload.tipo){
        case EspacioEnum.PROVINCIA :
            return { ...state, isLoadingProvincias:false }
        case EspacioEnum.CANTON :
            return { ...state, isLoadingCantones:false }
        case EspacioEnum.PARROQUIA :
            return { ...state, isLoadingParroquias:false }
    }
  }),

  on(accionesEspacio.crearEspacio, (state, payload) => {
      switch(payload.Espacio.tipo){
          case EspacioEnum.PROVINCIA :
              return { ...state, isLoadingProvincias:true }
          case EspacioEnum.CANTON :
              return { ...state, isLoadingCantones:true }
          case EspacioEnum.PARROQUIA :
              return { ...state, isLoadingParroquias:true }
      }
  }),
  on(accionesEspacio.crearEspacioExito, (state, payload) => {
    switch(payload.Espacio.tipo){
      case EspacioEnum.PROVINCIA :
          return { ...state, isLoadingProvincias:false }
      case EspacioEnum.CANTON :
          return { ...state, isLoadingCantones:false }
      case EspacioEnum.PARROQUIA :
          return { ...state, isLoadingParroquias:false }
    }
  }),

  on(accionesEspacio.crearEspacioError, (state, payload) => {
    switch(payload.Espacio.tipo){
      case EspacioEnum.PROVINCIA :
          return { ...state, isLoadingProvincias:false }
      case EspacioEnum.CANTON :
          return { ...state, isLoadingCantones:false }
      case EspacioEnum.PARROQUIA :
          return { ...state, isLoadingParroquias:false }
    }   
  }),

  on(accionesEspacio.actualizarEspacio, (state, payload) => {
    switch(payload.Espacio.tipo){
        case EspacioEnum.PROVINCIA :
            return { ...state, isLoadingProvincias:true }
        case EspacioEnum.CANTON :
            return { ...state, isLoadingCantones:true }
        case EspacioEnum.PARROQUIA :
            return { ...state, isLoadingParroquias:true }
    }
  }),
  on(accionesEspacio.actualizarEspacioExito, (state, payload) => {
    switch(payload.Espacio.tipo){
      case EspacioEnum.PROVINCIA :
          return { ...state, isLoadingProvincias:false }
      case EspacioEnum.CANTON :
          return { ...state, isLoadingCantones:false }
      case EspacioEnum.PARROQUIA :
          return { ...state, isLoadingParroquias:false }
    }
  }),

  on(accionesEspacio.actualizarEspacioError, (state, payload) => {
    switch(payload.Espacio.tipo){
      case EspacioEnum.PROVINCIA :
          return { ...state, isLoadingProvincias:false }
      case EspacioEnum.CANTON :
          return { ...state, isLoadingCantones:false }
      case EspacioEnum.PARROQUIA :
          return { ...state, isLoadingParroquias:false }
    }   
  }),

  on(accionesEspacio.eliminarEspacio, (state, payload) => {
    switch(payload.Espacio.tipo){
        case EspacioEnum.PROVINCIA :
            return { ...state, isLoadingProvincias:true }
        case EspacioEnum.CANTON :
            return { ...state, isLoadingCantones:true }
        case EspacioEnum.PARROQUIA :
            return { ...state, isLoadingParroquias:true }
    }
  }),
  on(accionesEspacio.eliminarEspacioExito, (state, payload) => {
  switch(payload.Espacio.tipo){
    case EspacioEnum.PROVINCIA :
        return { ...state, isLoadingProvincias:false }
    case EspacioEnum.CANTON :
        return { ...state, isLoadingCantones:false }
    case EspacioEnum.PARROQUIA :
        return { ...state, isLoadingParroquias:false }
  }
  }),

  on(accionesEspacio.eliminarEspacioError, (state, payload) => {
  switch(payload.Espacio.tipo){
    case EspacioEnum.PROVINCIA :
        return { ...state, isLoadingProvincias:false }
    case EspacioEnum.CANTON :
        return { ...state, isLoadingCantones:false }
    case EspacioEnum.PARROQUIA :
        return { ...state, isLoadingParroquias:false }
  }   
  })
);

export function reducer(state: EspacioState | undefined, action: Action) {
  return espacioReducer(state, action);
}


export const getEspacioState = (state:EspacioState)=> state

export const getEspinerProvincia = (state:EspacioState)=> state.isLoadingProvincias
export const getEspinerCanton = (state:EspacioState)=> state.isLoadingCantones
export const getEspinerParroquia = (state:EspacioState)=> state.isLoadingParroquias
