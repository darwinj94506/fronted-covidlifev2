import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actionsCantons from '../actions/canton.actions';
import { getCantonState } from '../reducers/canton.reducers';
import { CantonState } from '../reducers/canton.reducers';

@Injectable({
  providedIn: 'root'
})
export class CantonFacade {
  constructor(private store: Store<CantonState>) {
      console.log(this.store);
  }

  public loadCantons() {
    this.store.dispatch(actionsCantons.loadCantons());
  }
  public loadCantonSuccess(cantons){
    this.store.dispatch(actionsCantons.loadCantonsSuccess({cantons}))
  }

  public addCanton(canton) {
    this.store.dispatch(
      actionsCantons.createCanton({ canton })
    );
  }

  public updateCanton(canton){
    this.store.dispatch(
      actionsCantons.updateCanton({ canton })
    );
  }

  public openModalCreateUpdate(canton){
    this.store.dispatch(
      actionsCantons.openModalCreateUpdate({canton})
    )
  }

  public openModalConfirmation(canton){
    this.store.dispatch(
      actionsCantons.openModalConfirmation({canton})
    )
  }
  
  public getCantonList(): Observable<any> {
    return this.store.select(getCantonState)
  }

}