import { createAction, props } from '@ngrx/store';

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
  
  export const register = createAction(
    '[Register] Register',
    props<{user:any}>()
  );
  
  export const registerSuccess = createAction(
    '[Register] Register Success',
    props<{ user: any }>()
  );
  
  export const registerError = createAction(
    '[Register] Register Error',
    props<{ error: any }>()
  );
  
  