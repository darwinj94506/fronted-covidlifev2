import { Action, createReducer, on } from '@ngrx/store';
import * as authActions  from './auth.actions';

export interface AuthState {
  userLogged: any;
  isLoading:boolean;
  error: any
}

export const initialState: AuthState = {
  userLogged:{},
  isLoading:false,
  error: ''
};

const authReducer = createReducer(
  initialState,
  on(authActions.loadUserLogged, state => ({
      ...state,
      error:'',
      isLoading:true,
  })),
  on(authActions.loadUserLoggedSuccess, (state, payload) => { 
    console.log(payload.userLogged)
    return({
    ...state,
    isLoading:false,
    userLogged: {...payload.userLogged}
  })}),
  on(authActions.loadUserLoggedError, (state, payload) => ({
    ...state,
    isLoading:false,
    error:null
  })),
  on(authActions.login, (state, payload) => ({
    ...state,
    isLoading:true,
    error:null
  })),
  on(authActions.loginSuccess, (state, payload) => ({
    ...state,
    isLoading:false,
    userLogged:payload.userLogged
  })),
  on(authActions.loginError, (state, payload) => ({
    ...state,
    isLoading:false,
    error:payload.error
  })),  
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

export const getAuthState = (state:AuthState)=> state
export const getUserLogged = (state:AuthState)=> state.userLogged