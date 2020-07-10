import { ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducers';
import * as fromProvinceReducer from './reducers/province.reducers';
import * as fromCantonReducer from './reducers/canton.reducers';

export interface RootUserState {
    province: fromProvinceReducer.ProvinceState
    canton: fromCantonReducer.CantonState;
}

export interface AppState extends fromRoot.AppState {
    rootUserState: RootUserState;
}

export const RootUserReducers: ActionReducerMap<RootUserState> = {
    province: fromProvinceReducer.reducer,
    canton: fromCantonReducer.reducer,
};

export const selectRootUserState = createFeatureSelector<RootUserState>('rootUserState');
export const selectProvinceState = createSelector(selectRootUserState, (state) => state.province);
// export const getAllProvinces = createSelector(selectProvinceState, fromProvinceReducer.getProvinceState);
