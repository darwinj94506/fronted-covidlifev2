import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, exhaustMap, tap } from 'rxjs/operators';
import * as accionesHospital  from '../actions/hospital.actions';
import { Observable, from} from 'rxjs'; 
import { GestionarHospitalCaseUse, VerHospitalesPorLugarUseCase } from '../../../../core/usecases/root';
import { CRUDEnum } from '../../../../core/domain/enums';
import { ToastService } from '../../../../services';
import { ConfirmModalComponent } from '../../../../ui/components/confirm-modal/confirm-modal.component';
import { FormHospitalComponent } from '../../pages';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Injectable()
export class HospitalEffects {
    modalCreateUpdateRef: NgbModalRef;
    constructor( private actions$ : Actions, 
        private _gestionarHospital : GestionarHospitalCaseUse,
        private _verHospitalesPorLugar : VerHospitalesPorLugarUseCase,
        private _toastService : ToastService,
        private modalService: NgbModal
        ) { }

    @Effect()
    cargarHospitales: Observable<any> = this.actions$.pipe(
    ofType(accionesHospital.cargarHospitales),
    switchMap(({filter}) => this._verHospitalesPorLugar.execute(filter)
        .pipe(
            map(hospitales => accionesHospital.cargarHospitalesExito({Hospitales: hospitales})),
            catchError( error => {
                this._toastService.showError(`Error al cargar hospitales , Error:${error.message}`);
                return of( accionesHospital.cargarHospitalesError({error: error.message}))
                }
            )
        )))

    @Effect()
    crearHospital: Observable<any> = this.actions$.pipe(
        ofType(accionesHospital.crearHospital),
        exhaustMap(({Hospital}) => this._gestionarHospital.execute(Hospital, CRUDEnum.CREATE).pipe(
            map((Hospital) => {
                this._toastService.showSuccess(`Éxito, hospital creado : ${Hospital.nombre}`);
                this.closeModalCreateUpdate();
                return accionesHospital.crearHospitalExito({Hospital})
            }),
            catchError( (error) => {
                this._toastService.showError(`Error al crear hospital, Error:${error.message}, Entidad:${Hospital.nombre}`)
                return of( accionesHospital.crearHospitalError({error: error.message}) )
            })
        )),
    )

    @Effect()
    actualizarHospital: Observable<any> = this.actions$.pipe(
        ofType(accionesHospital.actualizarHospital),
        switchMap(({Hospital}) => this._gestionarHospital.execute(Hospital, CRUDEnum.UPDATE).pipe(
            map((Hospital) => {
                this._toastService.showSuccess(`Éxito, hospital actualizado: ${Hospital.nombre}`);
                this.closeModalCreateUpdate();
                return accionesHospital.actualizarHospitalExito({Hospital});
            }),
            catchError(error => {
                this._toastService.showError(`Error al actualizar, Error:${error.message}, Hospital:${Hospital.nombre}`);
                return of( accionesHospital.actualizarHospitalError({error: error.message}) )
            })
        )),
    )

    @Effect({dispatch : false})
    openModalCreateUpdate = this.actions$.pipe(
        ofType(accionesHospital.abrirModalCreateUpdate),
        tap(({ Hospital }) => 
            this.openModalCreateUpdateHospital(Hospital)
        ))

    @Effect()
    openModalConfirmation = this.actions$.pipe(
        ofType(accionesHospital.abrirModalConfirmacion),
        exhaustMap(({Hospital}) => 
            this.showConfirm().pipe(
                map(() => accionesHospital.eliminarHospital({Hospital})),
                catchError(() => of(accionesHospital.eliminarHospitalCancelar()))
        ))
    )

    @Effect()
    deleteProvince = this.actions$.pipe(
        ofType(accionesHospital.eliminarHospital),
        exhaustMap(({Hospital}) => 
            this._gestionarHospital.execute( Hospital, CRUDEnum.DELETE).pipe(
                map(() => {
                    this._toastService.showSuccess(`Éxito, hospital eliminado: ${Hospital.nombre}`);
                        accionesHospital.eliminarHospitalExito({Hospital})
                    }),
                catchError((error) => {
                    this._toastService.showError(` Error al eliminar,  Error: ${error.error}, Hospital: ${Hospital.nombre}`);
                    return of(accionesHospital.eliminarHospitalError({ error:error.error }))
                })
        ))
    )


    public openModalCreateUpdateHospital(hospital) {
        this.modalCreateUpdateRef = this.modalService.open( FormHospitalComponent, { centered: true })
        this.modalCreateUpdateRef.componentInstance.hospital = {...hospital};
    };

    public closeModalCreateUpdate() {
        this.modalCreateUpdateRef.dismiss()
    };

    public showConfirm(){
        const modalRef = this.modalService.open(ConfirmModalComponent)
        return from(modalRef.result)
    }
}
