import { ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromMainReducer from './reducers/main.reducers';
import * as fromSeguimientoReducer from './reducers/seguimiento.reducer';
import * as fromUserReducer from './reducers/user.reducer';
import { MainState } from './reducers/main.reducers';
import { UserState } from './reducers/user.reducer';

export interface AppState {
    main: fromMainReducer.MainState,
    seguimiento: fromSeguimientoReducer.SeguimientoState,
    user: fromUserReducer.UserState
}

export const AppReducers: ActionReducerMap<AppState> = {
    main: fromMainReducer.reducer,
    seguimiento: fromSeguimientoReducer.reducer,
    user: fromUserReducer.reducer
};

export const selectMainState = (state: AppState) => state.main;

export const selectUserLogged = createSelector(selectMainState,(state: MainState) => state.userLogged);
export const selectUsers = createSelector(selectMainState,(state: MainState) => state.users);
export const selectUsersLoading = createSelector(selectMainState,(state: MainState) => state.isLoadingUsers);
export const selectLogoutLoading = createSelector(selectMainState,(state: MainState) => state.isLoadingLogout);
export const selectHospitalSession = createSelector(selectMainState,(state: MainState) => state.hospitalSession);

export const selectUserState = (state: AppState) => state.user;
export const selectPerfilUser = createSelector(selectUserState,(state: UserState) => state.userPerfil);
export const selectLoadingUser = createSelector(selectUserState,(state: UserState) => state.isLoading);


export const selectSeguimientoState = (state: AppState) => state.seguimiento;
export const selectSeguimientosAgendados = createSelector(selectSeguimientoState,(state: fromSeguimientoReducer.SeguimientoState) => state.seguimientosAgendados);
