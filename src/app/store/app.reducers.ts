import { ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuthReducer from './auth/auth.reducers';
import { AuthState } from './auth/auth.reducers';

export interface AppState {
    authenticated: fromAuthReducer.AuthState
}

export const AppReducers: ActionReducerMap<AppState> = {
    authenticated: fromAuthReducer.reducer
};

export const selectAuthState = (state: AppState) => state.authenticated;
 
export const selectUserLogged = createSelector(
    selectAuthState,
  (state: AuthState) => state.userLogged
);


// export const selectAppState = createSelector<AppState>(AppReducers,);
// export const selectAuthState = createSelector(selectAppState, (state) => state.auth);
// export const selectUserLogged = createSelector(selectAuthState, fromAuthReducer.getUserLogged);
