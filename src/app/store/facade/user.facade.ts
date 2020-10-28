import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { IdIn, 
        AsignarRoleIn,
        UpdateUserIn, 
        FilterUserIn } from '../../core/domain/inputs';
import { RolesUserEnum } from '../../core/domain/enums';
import { UserPerfilOut, 
        FiltrarSeguimientoOut, 
        VORoleHospitalPopulateLoginOut,
        EditUserOut, 
        FilterUserOut } from '../../core/domain/outputs';
import { AppState, 
        selectUserPerfil, 
        selectLoadingUserPerfile, 
        selectIsLogged, 
        selectLoadingMiPerfil, 
        selectMiPerfil, 
        selectSearchingUsers, 
        selectFindedUsers} from '../app.reducer';
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
  dispatchActionOpenModalAsignarRole(hospitalRoles: VORoleHospitalPopulateLoginOut, idUsuario:String):void{
    this.store.dispatch(userActions.openModalAsignarRoles({hospitalRoles, idUsuario}))
  }

  distpachActionSearchUser(filter: FilterUserIn){
    this.store.dispatch(userActions.searchUser({filter}))
  }

  distpachActionOpenModalSearchUser():void{
    this.store.dispatch(userActions.openModalSearchUser())
  }

  getFindedUsersFromStore(): Observable<FilterUserOut[]>{
    return this.store.select(selectFindedUsers)
  }

  getSearchingUsersFromStorage(): Observable<boolean>{
    return this.store.select(selectSearchingUsers)
  }

  getIsLoggedFromStore():Observable<boolean>{
    return this.store.select(selectIsLogged)
  }

  dispatchActionOpenModalDatosPaciente(paciente: FilterUserOut){
    return this.store.dispatch(userActions.openModalDatosPaciente({paciente}))
  }

  dispatchEditUser(user: UpdateUserIn){
    this.store.dispatch(userActions.updateUser({user}))
  }

}