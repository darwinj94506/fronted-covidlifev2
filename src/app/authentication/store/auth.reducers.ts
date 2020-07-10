import { Action, createReducer, on } from '@ngrx/store';
import * as authActions  from './auth.actions';

export interface AuthState {
  isLoading:boolean;
  error: any
}

export const initialState: AuthState = {
  isLoading:false,
  error: ''
};

const authReducer = createReducer(
  initialState,
  on(authActions.login, (state, payload) => ({
    ...state,
    isLoading:true,
    error:null
  })),
  on(authActions.loginSuccess, (state, payload) => ({
    ...state,
    isLoading:false,
  })),
  on(authActions.loginError, (state, payload) => ({
    ...state,
    isLoading:false,
    error:payload.error
  })),
  on(authActions.register, (state, payload) => ({
    ...state,
    isLoading:true
  })),
  on(authActions.registerSuccess, (state, payload) => ({
    ...state,
    isLoading:false
  })),
  on(authActions.registerError, (state, payload) => ({
    ...state,
    isLoading:false,
    error:payload.error
  }))      
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

export const getAuthState = (state:AuthState)=> state
// export const getUserLogged = (state:AuthState)=> state.userLogged