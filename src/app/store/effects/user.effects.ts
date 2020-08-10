import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import * as userActions  from '../actions/user.actions';
import { ToastService } from '../../services';
import { VerPerfilUseCase, AsignarRolesUseCase, BuscarUsuarioUseCase  } from '../../core/usecases';
import { IdIn } from '../../core/domain/inputs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { PatientModalComponent } from '../../shared/profile/pages/patient-modal/patient-modal.component';
import { ConfirmModalComponent } from '../../ui/components/confirm-modal/confirm-modal.component';
import { UserModalComponent } from '../../shared/profile/pages/user-modal/user-modal.component';
import { RoleModalComponent } from '../../shared/profile/pages/role-modal/role-modal.component';
import { SearchInviteModalComponent } from '../../shared/profile/pages/search-invite-modal/search-invite-modal.component';
@Injectable()
export class UserEffects {
    modalAtenderPaciente: NgbModalRef;
    modalCreateUpdatePaciente: NgbModalRef;
    modalAsignarRoles: NgbModalRef;
    constructor( private actions$: Actions, 
        private _toastService: ToastService,
        private _spinner: NgxSpinnerService,
        private _verPerfilUseCase:VerPerfilUseCase,
        private modalService: NgbModal,
        private _asignarRolesUseCase:AsignarRolesUseCase,
        private _buscarUsuarioUseCase:BuscarUsuarioUseCase
         ) { }
   
    @Effect()
    verMiPerfil: Observable<any> = this.actions$.pipe(
        ofType(userActions.loadMiPerfil),
        tap( _=> this._spinner.show()),
        switchMap(({idUser}) => this._verPerfilUseCase.execute(idUser)
            .pipe(
                map(miPerfil => {
                    return userActions.loadMiPerfilSuccess({miPerfil})
                }),
                catchError( error => {
                    this._toastService.showError(`Error al cargar Mi perfil, Error:${error.message}`);
                    return of( userActions.loadMiPerfilError({error: error.message}))
                    }
                )
            )),
        tap( _=> this._spinner.hide()))
    
        @Effect()
    verPerfilUsuario: Observable<any> = this.actions$.pipe(
        ofType(userActions.loadPerfilUser),
        switchMap(({idUser}) => this._verPerfilUseCase.execute(idUser)
            .pipe(
                map(userPerfil => {
                    return userActions.loadPerfilUserSuccess({userPerfil})
                }),
                catchError( error => {
                    this._toastService.showError(`Error al cargar perfil, Error:${error.message}`);
                    return of( userActions.loadPerfilUserError({error: error.message}))
                    }
                )
            ))
        )

    @Effect()
    openModalAtenderPaciente: Observable<any> = this.actions$.pipe(
        ofType(userActions.openModalPatient),
        tap( _=> this._spinner.show()),
        switchMap(({seguimiento}) => {
            let idUser: IdIn = { _id: seguimiento.idPaciente._id } 
            return this._verPerfilUseCase.execute(idUser)
            .pipe(
                map(userPerfil => {
                    this.modalAtenderPaciente = this.modalService.open(PatientModalComponent, { size: 'xl', scrollable: true});
                    this.modalAtenderPaciente.componentInstance.userPerfil = {...userPerfil}
                    this.modalAtenderPaciente.componentInstance.seguimiento = {...seguimiento}
                    return userActions.loadPerfilUserSuccess({userPerfil})
                }),
                catchError( error => {
                    this._toastService.showError(`Error al abrir modal. Por favor Vuelva a itentarlo, Error:${error.message}`);
                    return of( userActions.loadPerfilUserError({error: error.message}))
                    }
                )
            )}),
        tap( _=> this._spinner.hide()))

    @Effect({dispatch:false})
    openModalCreateUpdateUser: Observable<any> = this.actions$.pipe(
        ofType(userActions.openModalCreateUpdateUser),
            tap(({user}) => { 
                this.modalCreateUpdatePaciente = this.modalService.open(UserModalComponent, { size: 'xl' });
                this.modalCreateUpdatePaciente.componentInstance.user = {...user}
        }) 
    )

    @Effect({dispatch:false})
    openModalSearchUser: Observable<any> = this.actions$.pipe(
        ofType(userActions.openModalSearchUser),
            tap( _ => { 
                this.modalService.open(SearchInviteModalComponent, { scrollable: true });
        }) 
    )


    @Effect()
    asignarRoles: Observable<any> = this.actions$.pipe(
        ofType(userActions.asignarRoles),
            tap(_=>this._spinner.show()),
            switchMap(({roles}) => this._asignarRolesUseCase.execute(roles).pipe(
                map(rolesOutput=>{
                    this._toastService.showSuccess(`Accion realizada con éxito`);
                    return userActions.asignarRolesSuccess({rolesOutput})
                }),
                catchError(error=>{
                    this._toastService.showError(`Error al asignar Rol. Error:${error.message}`);
                    return of(userActions.asignarRolesError({error:error.message}))
                })
            )),
            tap(_=>this._spinner.hide()) 
    )

    @Effect({dispatch:false})
    openModalAsignarRoles: Observable<any> = this.actions$.pipe(
        ofType(userActions.openModalAsignarRoles),
            tap((payload) => { 
                this.modalAsignarRoles = this.modalService.open(RoleModalComponent, { size: 'xl' });
                this.modalAsignarRoles.componentInstance.hospitalRoles = payload.hospitalRoles
                this.modalAsignarRoles.componentInstance.idUsuario = payload.idUsuario
        }) 
    )

    @Effect()
    loadUsers: Observable<any> = this.actions$.pipe(
        ofType(userActions.searchUser),
        switchMap(payload => this._buscarUsuarioUseCase.execute(payload.filter)
        .pipe(
            map(findedUsers => {
                return userActions.searchUserSuccess({findedUsers})
            }),
            catchError( error => {
                this._toastService.showError(`Error al cargar usuarios , Error:${error.message}`);
                return of( userActions.searchUserError(error))
                }
            )
        )))
}

