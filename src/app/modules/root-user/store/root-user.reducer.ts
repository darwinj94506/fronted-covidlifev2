import { ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as fromProvinceReducer from './reducers/province.reducers';
import * as fromCantonReducer from './reducers/canton.reducers';
import * as fromEspacio from './reducers/espacio.reducer';

export interface RootUserState {
    province: fromProvinceReducer.ProvinceState
    canton: fromCantonReducer.CantonState;
    espacio: fromEspacio.EspacioState;
}

export interface AppState extends fromRoot.AppState {
    rootUserState: RootUserState;
}

export const RootUserReducers: ActionReducerMap<RootUserState> = {
    province: fromProvinceReducer.reducer,
    canton: fromCantonReducer.reducer,
    espacio: fromEspacio.reducer
};

export const selectRootUserState = createFeatureSelector<RootUserState>('rootUserState');
export const selectProvinceState = createSelector(selectRootUserState, (state) => state.province);

export const selectEspacioState = createSelector(selectRootUserState, (state) => state.espacio);
export const selectCargandoProvincias = createSelector(selectEspacioState, (state) => state.isLoadingProvincias);
export const selectCargandoCantones = createSelector(selectEspacioState, (state) => state.isLoadingCantones);
export const selectCargandoParroquias = createSelector(selectEspacioState, (state) => state.isLoadingParroquias);

export const selectProvincias = createSelector(selectEspacioState, (state) => state.provincias);
export const selectCantones = createSelector(selectEspacioState, (state) => state.cantones);
export const selectParroquias = createSelector(selectEspacioState, (state) => state.parroquias);







// export const getAllProvinces = createSelector(selectProvinceState, fromProvinceReducer.getProvinceState);
