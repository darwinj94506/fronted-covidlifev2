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
export const selectIsLogged = createSelector(selectMainState,(state: MainState) => state.isLogged);
export const selectUsers = createSelector(selectMainState,(state: MainState) => state.users);
export const selectUsersLoading = createSelector(selectMainState,(state: MainState) => state.isLoadingUsers);
// export const selectLogoutLoading = createSelector(selectMainState,(state: MainState) => state.isLoadingLogout);
export const selectHospitalSession = createSelector(selectMainState,(state: MainState) => state.hospitalSession);
export const selectAllHospitales = createSelector(selectMainState,(state: MainState) => state.hospitales);
export const selectIsLoadingHospitales = createSelector(selectMainState,(state: MainState) => state.isLoadingHospitales);

export const selectProvincias = createSelector(selectMainState,(state: MainState) => state.provincias);
export const selectCantones = createSelector(selectMainState,(state: MainState) => state.cantones);
export const selectParroquias = createSelector(selectMainState,(state: MainState) => state.parroquias);
export const selectBarrios = createSelector(selectMainState,(state: MainState) => state.barrios);

export const selectIsLoadingProvincias = createSelector(selectMainState,(state: MainState) => state.isLoadingProvincias);
export const selectIsLoadingCantones = createSelector(selectMainState,(state: MainState) => state.isLoadingCantones);
export const selectIsLoadingParroquias = createSelector(selectMainState,(state: MainState) => state.isLoadingParroquias);
export const selectIsLoadingBarrios = createSelector(selectMainState,(state: MainState) => state.isLoadingBarrios);



export const selectUserState = (state: AppState) => state.user;
export const selectMiPerfil = createSelector(selectUserState,(state: UserState) => state.miPerfil);
export const selectLoadingMiPerfil = createSelector(selectUserState,(state: UserState) => state.isLoadingMiPerfil);
export const selectUserPerfil = createSelector(selectUserState,(state: UserState) => state.userPerfil);
export const selectLoadingUserPerfile = createSelector(selectUserState,(state: UserState) => state.isLoadingPerfilUser);
export const selectFindedUsers = createSelector(selectUserState,(state: UserState) => state.findedUsers);
export const selectSearchingUsers = createSelector(selectUserState,(state: UserState) => state.isSearchingUsers);

export const selectSeguimientoState = (state: AppState) => state.seguimiento;
export const selectSeguimientosAgendados = createSelector(selectSeguimientoState,(state: fromSeguimientoReducer.SeguimientoState) => state.seguimientosAgendados);
export const selectCitasPacientes = createSelector(selectSeguimientoState,(state: fromSeguimientoReducer.SeguimientoState) => state.citasPaciente);
export const selectSeguimientosCompletos = createSelector(selectSeguimientoState,(state: fromSeguimientoReducer.SeguimientoState) => state.seguimientosCompletosPaciente);
export const selectIsLoadingSeguimientosCompletos = createSelector(selectSeguimientoState,(state: fromSeguimientoReducer.SeguimientoState) => state.isLoadingSeguimientosCompletos);