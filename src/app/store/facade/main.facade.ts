import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as mainActions from '../actions/main.actions';
import { IUsuarioEntity, VORoleHospital, IHospitalEntity} from '../../core/domain/entities';
import { FilterUserIn, FilterHospitalIn } from '../../core/domain/inputs';
import { LoginOut, VORoleHospitalPopulateLoginOut} from '../../core/domain/outputs'; 
import { AppState,
         selectUserLogged,
         selectUsers,
         selectHospitalSession,
         selectIsLogged,
         selectAllHospitales,
         selectIsLoadingHospitales,
         selectUsersLoading }from '../app.reducer';
         
@Injectable({
  providedIn: 'root'
})

export class MainFacade {
  constructor(private store: Store<AppState>) {}

  loadUserLoggedSuccess(userLogged){
    this.store.dispatch(mainActions.loadUserLoggedSuccess({userLogged}))
  }

  loadUserLoggedError(error:string){
    this.store.dispatch(mainActions.loadUserLoggedError({error}))
  }

  getUserLogged():Observable<LoginOut>{
    return this.store.select(selectUserLogged).pipe(first())
  }

  getUsers(){
    return this.store.select(selectUsers);
  }

  getLoadingUser(): Observable<boolean>{
    return this.store.select(selectUsersLoading);
  }

  getIsLoggedFromStore(): Observable<boolean>{
    return this.store.select(selectIsLogged).pipe(first());
  }

  loadUsers(filter:FilterUserIn): void {
    this.store.dispatch(mainActions.loadUsers({filter}))
  }

  createUser(user: IUsuarioEntity){
    this.store.dispatch(mainActions.createUser({user}))
  }

  updateUser(user: IUsuarioEntity){
    this.store.dispatch(mainActions.updateUser({user}))
  }

  
  getHospitalSesion():Observable<VORoleHospitalPopulateLoginOut>{
    return this.store.select(selectHospitalSession).pipe(first());
  }

  setHospitalSession(hospitalSession: VORoleHospitalPopulateLoginOut){
    this.store.dispatch(mainActions.saveHospitalSession({hospitalSession}))
  }

  setUserLogged(userLogged: LoginOut){
    this.store.dispatch(mainActions.saveUserLogged({userLogged}))
  }

  logout(){
    this.store.dispatch(mainActions.logout())
  }

  dispatchActionLoadHospitales(filter: FilterHospitalIn):void{
    this.store.dispatch(mainActions.cargarHospitales({filter}))
  }

  getLoadingHospitales(): Observable<boolean>{
    return this.store.select(selectIsLoadingHospitales)
  }
  
  getHospitales(): Observable<IHospitalEntity[]>{
    return this.store.select(selectAllHospitales)
  }

  
}