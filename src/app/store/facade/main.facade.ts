import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as mainActions from '../actions/main.actions';
import { IUsuarioEntity, VORoleHospital, IHospitalEntity, IEspacioEntity } from '../../core/domain/entities';
import { FilterUserIn, 
         FilterHospitalIn, 
         FilterEspaceIn, 
         VerEspacioIn, 
         ContadoresEstadisticaIn} from '../../core/domain/inputs';
import { LoginOut, VORoleHospitalPopulateLoginOut, VerEspacioOut} from '../../core/domain/outputs'; 
import { AppState,
         selectUserLogged,
         selectUsers,
         selectHospitalSession,
         selectIsLogged,
         selectAllHospitales,
         selectIsLoadingHospitales,
         selectUsersLoading, 
         selectProvincias,
         selectCantones,
         selectParroquias,
         selectBarrios,
         selectIsLoadingProvincias,
         selectIsLoadingCantones,
         selectIsLoadingParroquias,
         selectIsLoadingBarrios,
         selectDetalleEspacio,
         selectIsLoagingDetalleEspacio
        } from '../app.reducer';
import { EspacioEnum } from 'src/app/core/domain/enums';
         
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

  dispatchActionOpenModalDatosPaciente(){
    
  }

  getProvinciasFromStorage(): Observable<IEspacioEntity[]>{
    return this.store.select(selectProvincias)
  }
  getCantonesFromStorage(): Observable<IEspacioEntity[]>{
    return this.store.select(selectCantones)
  }
  getParroquiasFromStorage(): Observable<IEspacioEntity[]>{
    return this.store.select(selectParroquias)
  }
  getBarriosFromStorage(): Observable<IEspacioEntity[]>{
    return this.store.select(selectBarrios)
  }

  getIsLoadingProvinciasFromStorage():Observable<boolean>{
    return this.store.select(selectIsLoadingProvincias)
  }

  getIsLoadingCantones():Observable<boolean>{
    return this.store.select(selectIsLoadingCantones)
  }

  getIsLoadingParroquias():Observable<boolean>{
    return this.store.select(selectIsLoadingParroquias)
  }

  getIsLoadingBarrios():Observable<boolean>{
    return this.store.select(selectIsLoadingBarrios)
  }

  distatchActionLoadEspacios(tipo:EspacioEnum, filtro:FilterEspaceIn ){
    return this.store.dispatch(mainActions.cargarEspacios({tipo, filtro}))
  }

  distatchActionDetalleEspacio(filtro:VerEspacioIn ){
    return this.store.dispatch(mainActions.verDetalleEspacio({filtro}))
  }
  
  getDetalleEspacioFromStorage():Observable<VerEspacioOut>{
    return this.store.select(selectDetalleEspacio)
  }

 

  distatchActionOpenModalFiltro(filtro:VerEspacioIn,
    filterEvolucion: ContadoresEstadisticaIn,
    filterDiagnosticos :ContadoresEstadisticaIn,
    filterTotalDoctores: ContadoresEstadisticaIn,
    filterTotalPacientes: ContadoresEstadisticaIn){
    return this.store.dispatch(mainActions
      .openModalFiltrarEspacio({filtro, 
        filterEvolucion, 
        filterDiagnosticos, 
        filterTotalDoctores, 
        filterTotalPacientes}))
  }

}