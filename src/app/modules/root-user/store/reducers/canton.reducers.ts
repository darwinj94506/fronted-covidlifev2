import { Action, createReducer, on } from '@ngrx/store';
import * as actionsCantons  from '../actions/canton.actions';

export interface CantonState {
  cantons: any;
  isLoading:boolean;
  error: any
}

export const initialState: CantonState = {
  cantons: [],
  isLoading:false,
  error: ''
};

const cantonReducer = createReducer(
  initialState,
  on(actionsCantons.loadCantons, state => ({
      ...state,
      error:'',
      isLoading:true,
  })),
  on(actionsCantons.loadCantonsSuccess, (state, payload) => ({
    ...state,
    isLoading:false,
    provinces: payload.cantons
  })),
  on(actionsCantons.loadCantonsError, (state, payload) => ({
    ...state,
    isLoading:false,
    error: payload.error
  })),

  on(actionsCantons.createCanton, state => ({
    ...state,
    error:'',
    isLoading:true
  })),
  on(actionsCantons.createCantonSuccess, (state) => ({
    ...state,
    error:'',
    isLoading:false
  })),
  on(actionsCantons.createCantonError, (state, payload) => ({
    ...state,
    error: payload.error,
    isLoading:false
  })),
  on(actionsCantons.updateCanton, state => ({
    ...state,
    error:'',
    isLoading:true
  })),
  on(actionsCantons.updateCantonSuccess, (state) => ({
    ...state,
    error:'',
    isLoading:false
  })),
  on(actionsCantons.updateCantonError, (state, payload) => ({
    ...state,
    error: payload.error,
    isLoading:false
  })),
  on(actionsCantons.deleteCanton, state => ({
    ...state,
    error:'',
    isLoading:true
  })),
  on(actionsCantons.deleteCantonSuccess, (state) => ({
    ...state,
    error:'',
    isLoading:false
  })),
  on(actionsCantons.deleteCantonError, (state, payload) => ({
    ...state,
    error: payload.error,
    isLoading:false
  })),
  
);

export function reducer(state: CantonState | undefined, action: Action) {
  return cantonReducer(state, action);
}

export const getCantonState = (state:CantonState)=> state
