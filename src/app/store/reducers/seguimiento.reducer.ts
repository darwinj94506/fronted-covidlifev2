import { Action, createReducer, on } from '@ngrx/store';
import * as seguimientosActions  from '../actions/seguimiento.actions';
export interface SeguimientoState {
  isLoading: boolean;
} 
export const initialState: SeguimientoState = {
  isLoading:false,
};

const mainReducer = createReducer(
  initialState,
  
  on(seguimientosActions.createSeguimiento, (state) => ({
    ...state,
    isLoadingUsers: true
  })),
  on(seguimientosActions.createSeguimientoSuccess, (state) => ({
    ...state,
    isLoadingUsers: false
  })),
  on(seguimientosActions.createSeguimientoError, (state) => ({
    ...state,
    isLoadingUsers: false
  })),
 
);

export function reducer(state: SeguimientoState | undefined, action: Action) {
  return mainReducer(state, action);
}

export const getMainState = (state:SeguimientoState)=> state
export const getUserLogged = (state:SeguimientoState)=> state.isLoading