import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import * as userActions  from '../actions/user.actions';
import { ToastService } from '../../services';
import { VerPerfilUseCase } from '../../core/usecases';
import { IdIn } from '../../core/domain/inputs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { PatientModalComponent } from '../../shared/profile/pages/patient-modal/patient-modal.component';
import { ConfirmModalComponent } from '../../ui/components/confirm-modal/confirm-modal.component';
@Injectable()
export class UserEffects {
    modalCreateUpdateRef: NgbModalRef;
    constructor( private actions$: Actions, 
        private _toastService: ToastService,
        private _spinner: NgxSpinnerService,
        private _verPerfilUseCase:VerPerfilUseCase,
        private modalService: NgbModal,
         ) { }
   
    @Effect()
    create: Observable<any> = this.actions$.pipe(
        ofType(userActions.loadPerfil),
        tap( _=> this._spinner.show()),
        switchMap(({idUser}) => this._verPerfilUseCase.execute(idUser)
            .pipe(
                map(userPerfil => {
                    return userActions.loadPerfilSuccess({userPerfil})
                }),
                catchError( error => {
                    this._toastService.showError(`Error al cargar perfil, Error:${error.message}`);
                    return of( userActions.loadPerfilError({error: error.message}))
                    }
                )
            )),
        tap( _=> this._spinner.hide()))

    @Effect()
    openModal: Observable<any> = this.actions$.pipe(
        ofType(userActions.openModalPatient),
        tap( _=> this._spinner.show()),
        switchMap(({seguimiento}) => {
            let idUser: IdIn = { _id: seguimiento.idPaciente._id } 
            return this._verPerfilUseCase.execute(idUser)
            .pipe(
                map(userPerfil => {
                    this.modalCreateUpdateRef = this.modalService.open(PatientModalComponent, { size: 'xl' });
                    this.modalCreateUpdateRef.componentInstance.userPerfil = {...userPerfil}
                    this.modalCreateUpdateRef.componentInstance.seguimiento = {...seguimiento}
                    return userActions.loadPerfilSuccess({userPerfil})
                }),
                catchError( error => {
                    this._toastService.showError(`Error al abrir modal. Por favor Vuelva a itentarlo, Error:${error.message}`);
                    return of( userActions.loadPerfilError({error: error.message}))
                    }
                )
            )}),
        tap( _=> this._spinner.hide()),)

   

}

