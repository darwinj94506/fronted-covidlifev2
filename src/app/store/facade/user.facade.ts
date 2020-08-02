import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { IdIn } from '../../core/domain/inputs';
import { UserPerfilOut, FiltrarSeguimientoOut } from '../../core/domain/outputs';
import { AppState, selectPerfilUser }from '../app.reducer';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class UserFacade {
  constructor(private store: Store<AppState>) {}

  loadPerfil(idUser: IdIn ):void{
    this.store.dispatch(userActions.loadPerfil({idUser}))
  }

  openModalPerfil(seguimiento: FiltrarSeguimientoOut ):void{
    this.store.dispatch(userActions.openModalPatient({seguimiento}))
  }

  getPerfilUser(): Observable<UserPerfilOut>{
    return this.store.select(selectPerfilUser)
  } 
}