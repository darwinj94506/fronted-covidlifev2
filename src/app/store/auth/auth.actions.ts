import { createAction, props } from '@ngrx/store';

export const loadUserLogged = createAction(
  '[Auth] Load User Logged'
);

export const loadUserLoggedSuccess = createAction(
  '[Auth] Load User Logged Success',
  props<{ userLogged:any}>()
);

export const loadUserLoggedError =createAction(
  '[Auth] Load User Logged Error'
)

export const login = createAction(
  '[Auth] Login',
  props<{ user: any}>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ userLogged: any }>()
);

export const loginError = createAction(
  '[Auth] Login Error',
  props<{ error: any }>()
);

