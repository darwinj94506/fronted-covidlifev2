import { createAction, props } from '@ngrx/store';
import { SignupIn } from '../../core/domain/inputs';
import { LoginOut } from '../../core/domain/outputs';
export const login = createAction(
    '[Auth] Login',
    props<{ user: any}>()
  );
  
  export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ userLogged: LoginOut }>()
  );
  
  export const loginError = createAction(
    '[Auth] Login Error',
    props<{ error: any }>()
  );
  
  export const register = createAction(
    '[Auth] Register',
    props<{ user: SignupIn }>()
  );
  
  export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ user: any }>()
  );
  
  export const registerError = createAction(
    '[Auth] Register Error',
    props<{ error: string }>()
  );


  
  