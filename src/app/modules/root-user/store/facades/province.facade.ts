import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actionsProvinces from '../actions/province.actions';
// import { getProvinceState } from '../reducers/province.reducers';
import { selectProvinceState} from '../root-user.reducer';
@Injectable({
  providedIn: 'root'
})
export class ProvinceFacade {
  constructor(private store: Store<any>) {}

  public loadProvinces() {
    this.store.dispatch(actionsProvinces.loadProvinces());
  }
  public loadProvinceSuccess(provinces){
    this.store.dispatch(actionsProvinces.loadProvincesSuccess({provinces}))
  }

  public addProvince(newProvince: any) {
    this.store.dispatch(
      actionsProvinces.createProvince({ province: { ...newProvince } })
    );
  }

  public updateProvince(province){
    this.store.dispatch(
      actionsProvinces.updateProvince({ province: { ...province } })
    );
  }

  public openModalCreateUpdate(province){
    this.store.dispatch(
      actionsProvinces.openModalCreateUpdate({province})
    )
  }

  public openModalConfirmation(province){
    this.store.dispatch(
      actionsProvinces.openModalConfirmation({province})
    )
  }
  
  public getProvinceList(): Observable<any> {
    return this.store.select(selectProvinceState)
  }

}