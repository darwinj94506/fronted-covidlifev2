import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import * as userActions  from '../actions/user.actions';
import { ToastService } from '../../services';
import { VerPerfilUseCase, AsignarRolesUseCase } from '../../core/usecases';
import { IdIn } from '../../core/domain/inputs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { PatientModalComponent } from '../../shared/profile/pages/patient-modal/patient-modal.component';
import { ConfirmModalComponent } from '../../ui/components/confirm-modal/confirm-modal.component';
import { UserModalComponent } from '../../shared/profile/pages/user-modal/user-modal.component';

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
        private _asignarRolesUseCase:AsignarRolesUseCase
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
                    this.modalAtenderPaciente = this.modalService.open(PatientModalComponent, { size: 'xl' });
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

    @Effect()
    asignarRoles: Observable<any> = this.actions$.pipe(
        ofType(userActions.asignarRoles),
            tap(_=>this._spinner.show()),
            switchMap(({roles}) => this._asignarRolesUseCase.execute(roles).pipe(
                map(rolesOutput=>userActions.asignarRolesSuccess({rolesOutput})),
                catchError(error=>{
                    return of(userActions.asignarRolesError({error:error.message}))
                })
            )),
            tap(_=>this._spinner.hide()) 
    )

    @Effect({dispatch:false})
    openModalAsignarRoles: Observable<any> = this.actions$.pipe(
        ofType(userActions.openModalAsignarRoles),
            tap(({roles}) => { 
                this.modalAsignarRoles = this.modalService.open(UserModalComponent, { size: 'xl' });
                this.modalAsignarRoles.componentInstance.roles = roles
        }) 
    )



}

