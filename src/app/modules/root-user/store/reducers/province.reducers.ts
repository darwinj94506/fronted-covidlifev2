import { Action, createReducer, on } from '@ngrx/store';
import * as actionsProvinces  from '../actions/province.actions';

export interface ProvinceState {
  provinces: any;
  isLoading:boolean;
  error: any
}

export const initialState: ProvinceState = {
  provinces: [],
  isLoading:false,
  error: ''
};

const provinceReducer = createReducer(
  initialState,
  on(actionsProvinces.loadProvinces, state => ({
      ...state,
      error:'',
      isLoading:true,
  })),
  on(actionsProvinces.loadProvincesSuccess, (state, payload) => ({
    ...state,
    isLoading:false,
    provinces: payload.provinces
  })),
  on(actionsProvinces.loadProvincesError, (state, payload) => ({
    ...state,
    isLoading:false,
    error: payload.error
  })),

  on(actionsProvinces.createProvince, state => ({
    ...state,
    error:'',
    isLoading:true
  })),
  on(actionsProvinces.createProvinceSuccess, (state) => ({
    ...state,
    error:'',
    isLoading:false
  })),
  on(actionsProvinces.createProvinceError, (state, payload) => ({
    ...state,
    error: payload.error,
    isLoading:false
  })),
  on(actionsProvinces.updateProvince, state => ({
    ...state,
    error:'',
    isLoading:true
  })),
  on(actionsProvinces.updateProvinceSuccess, (state) => ({
    ...state,
    error:'',
    isLoading:false
  })),
  on(actionsProvinces.updateProvinceError, (state, payload) => ({
    ...state,
    error: payload.error,
    isLoading:false
  })),
  on(actionsProvinces.deleteProvince, state => ({
    ...state,
    error:'',
    isLoading:true
  })),
  on(actionsProvinces.deleteProvinceSuccess, (state) => ({
    ...state,
    error:'',
    isLoading:false
  })),
  on(actionsProvinces.deleteProvinceError, (state, payload) => ({
    ...state,
    error: payload.error,
    isLoading:false
  })),
  
  
  
 

);

export function reducer(state: ProvinceState | undefined, action: Action) {
  return provinceReducer(state, action);
}


export const getProvinceState = (state:ProvinceState)=> state
// export const getAuthAction = (action:any)=> action.payload
// export const getAuthLoading = (state:ProvinceState)=> state.isLoading
// export const getAuthError = (state:ProvinceState)=> state.error