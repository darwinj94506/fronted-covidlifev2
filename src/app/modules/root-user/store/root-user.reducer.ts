import { ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as fromProvinceReducer from './reducers/province.reducers';
import * as fromEspacio from './reducers/espacio.reducer';
import * as fromHospital from './reducers/hospital.reducer';

export interface RootUserState {
    province: fromProvinceReducer.ProvinceState;
    espacio: fromEspacio.EspacioState;
    hospital : fromHospital.HospitalState;
}

export interface AppState extends fromRoot.AppState {
    rootUserState: RootUserState;
}

export const RootUserReducers: ActionReducerMap<RootUserState> = {
    province: fromProvinceReducer.reducer,
    espacio: fromEspacio.reducer,
    hospital : fromHospital.reducer 
};

export const selectRootUserState = createFeatureSelector<RootUserState>('rootUserState');
export const selectProvinceState = createSelector(selectRootUserState, (state) => state.province);

export const selectEspacioState = createSelector(selectRootUserState, (state) => state.espacio);
export const selectCargandoProvincias = createSelector(selectEspacioState, (state) => state.isLoadingProvincias);
export const selectCargandoCantones = createSelector(selectEspacioState, (state) => state.isLoadingCantones);
export const selectCargandoParroquias = createSelector(selectEspacioState, (state) => state.isLoadingParroquias);
export const selectCargandoBarrios = createSelector(selectEspacioState, (state) => state.isLoadingBarrios);

export const selectHospitalState = createSelector(selectRootUserState, (state) => state.hospital);
export const selectCargandoHospitales = createSelector(selectHospitalState, (state) => state.isLoading);
export const selectHospitales = createSelector(selectHospitalState, (state) => state.hospitales);

export const selectProvincias = createSelector(selectEspacioState, (state) => state.provincias);
export const selectCantones = createSelector(selectEspacioState, (state) => state.cantones);
export const selectParroquias = createSelector(selectEspacioState, (state) => state.parroquias);
export const selectBarrios = createSelector(selectEspacioState, (state) => state.barrios);






// export const getAllProvinces = createSelector(selectProvinceState, fromProvinceReducer.getProvinceState);
