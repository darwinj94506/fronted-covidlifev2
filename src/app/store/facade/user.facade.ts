import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { IdIn, AsignarRoleIn } from '../../core/domain/inputs';
import { UserPerfilOut, FiltrarSeguimientoOut } from '../../core/domain/outputs';
import { AppState, selectUserPerfil, selectLoadingUserPerfile, selectLoadingMiPerfil, selectMiPerfil} from '../app.reducer';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class UserFacade {
  constructor(private store: Store<AppState>) {}

  loadMiPerfil(idUser: IdIn):void{
    this.store.dispatch(userActions.loadMiPerfil({idUser}))
  }

  loadPerfilUser(idUser: IdIn):void{
    this.store.dispatch(userActions.loadPerfilUser({idUser}))
  }

  openModalPerfil(seguimiento: FiltrarSeguimientoOut ):void{
    this.store.dispatch(userActions.openModalPatient({seguimiento}))
  }

  getPerfilUser(): Observable<UserPerfilOut>{
    return this.store.select(selectUserPerfil)
  } 

  getMiPerfil(): Observable<UserPerfilOut>{
    return this.store.select(selectMiPerfil)
  } 

  getLoadingMiPerfilStore(): Observable<boolean>{
    return this.store.select(selectLoadingMiPerfil)
  }

  getLoadingPerfilUserStore(): Observable<boolean>{
    return this.store.select(selectLoadingUserPerfile)
  }

  dispatchActionOpenModalCreateUpdateUser(user):void{
    this.store.dispatch(userActions.openModalCreateUpdateUser(user))
  }

  dispatchActionAsignarRole(roles: AsignarRoleIn):void{
    this.store.dispatch(userActions.asignarRoles({roles}))
  }
  dispatchActionOpenModalAsignarRole(roles: AsignarRoleIn):void{
    this.store.dispatch(userActions.openModalAsignarRoles({roles}))
  }
}