import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap, mergeMap, concatMapTo, concatMap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import * as seguimientoActions  from '../actions/seguimiento.actions';
import { ToastService, NotificationService } from '../../services';
import { SolicitarSeguimentoUseCase,
         VerCitasUseCase } from '../../core/usecases/paciente';
import { MacarSeguimientoComoAtendido,
         VerSeguimientosAgendadosUseCase,
         VerResumenSeguimientosPacienteUseCase, 
         EnviarNotificacionUseCase,
         MacarSeguimientoComoAgendado } from '../../core/usecases/doctor';
import { SeguimientoEstadoEnum } from '../../core/domain/enums'
import { FiltrarSeguimientoIn, AgendarSolicitudSeguimientoIn, CrearNotificacionIn } from '../../core/domain/inputs'
import { NgxSpinnerService } from 'ngx-spinner';
import { MainFacade } from '../facade';
@Injectable()
export class SeguimientoEffects {
    constructor( private actions$: Actions, 
        private _toastService: ToastService,
        private _spinner: NgxSpinnerService,
        private _solicitarSeguimientoUseCase: SolicitarSeguimentoUseCase,
        private _macarSeguimientoComoAtendido: MacarSeguimientoComoAtendido,
        private _macarSeguimientoComoAgendado: MacarSeguimientoComoAgendado,
        private _verSeguimientosAgendadosUseCase: VerSeguimientosAgendadosUseCase,
        private _verCitasUseCase:VerCitasUseCase,
        private _mainFacade : MainFacade,
        private _notificationService:NotificationService,
        private _enviarNotificacionUseCase:EnviarNotificacionUseCase,
        private _VerResumenSeguimientosPacienteUseCase:VerResumenSeguimientosPacienteUseCase
         ) { }
   
    @Effect()
    create: Observable<any> = this.actions$.pipe(
        ofType(seguimientoActions.createSeguimiento),
        tap( _=> this._spinner.show()),
        switchMap(({seguimientoIn}) => this._solicitarSeguimientoUseCase.execute(seguimientoIn)
            .pipe(
                map(seguimientoOut => {
                    this._toastService.showSuccess(`Enviado con éxito`);
                    return seguimientoActions.createSeguimientoSuccess({seguimientoOut})
                }),
                catchError( error => {
                    this._toastService.showError(`Error al enviar, Error:${error.message}`);
                    return of( seguimientoActions.createSeguimientoError({error: error.message}))
                    }
                )
            )),
        tap( _=> this._spinner.hide()))

    @Effect()
    agendar: Observable<any> = this.actions$.pipe(
        ofType(seguimientoActions.agendarSeguimiento),
        tap( _=> this._spinner.show()),
        switchMap((payload) => {
            let segForAgendar: AgendarSolicitudSeguimientoIn = { _id: payload.seguimiento._id }
            return this._macarSeguimientoComoAgendado.execute(segForAgendar)
                .pipe(
                    map(scheduledSeguimiento => {
                        this._toastService.showSuccess(`Agendado con éxito`);
                        return seguimientoActions.agendarSeguimientoSuccess({scheduledSeguimiento,
                            seguimiento: payload.seguimiento, doctor:payload.doctor})
                                
                    }),
                    catchError( error => {
                        this._toastService.showError(`Error al agendar, por inténtelo nuevamente, Error:${error.message}`);
                        return of( seguimientoActions.agendarSeguimientoError({error: error.message}))
                        }
                    )
                )}),
        tap( _=> this._spinner.hide()))
      
    @Effect()
    agendarSeguimientosExito: Observable<any> = this.actions$.pipe(
        ofType(seguimientoActions.agendarSeguimientoSuccess),
        concatMap( payload =>
            {   let notificacion : CrearNotificacionIn = {
                    descripcion:'* ¡Su solicitud ha sido aceptada por un médico! * Esté pendiente, en un momento un doctor se comunicará con usted *',
                    idReceptor: payload.seguimiento.idPaciente._id,
                    titulo:'Notificación',
                    idSeguimiento: payload.seguimiento._id
                }
                return [seguimientoActions.sendPushNotification({ seguimiento: payload.seguimiento,
                                                    notificacion: notificacion,
                                                    doctor: payload.doctor }), 
                        seguimientoActions.createNotification({ notification: notificacion })]
            }
        )
    )

    @Effect()
    sendNotificationVideoLlamada: Observable<any> = this.actions$.pipe(
        ofType(seguimientoActions.sendNotificationVideoLlamada),
        concatMap( payload => [seguimientoActions.sendPushNotification({ seguimiento: payload.seguimiento,
                                                    notificacion: payload.notification,
                                                    doctor: payload.doctor }), 
                               seguimientoActions.createNotification({ notification: payload.notification })]
            
        )
    )
    
    @Effect()
    createNotification: Observable<any> = this.actions$.pipe(
        ofType(seguimientoActions.createNotification),
        switchMap( ({ notification } ) => 
            this._enviarNotificacionUseCase.execute(notification)
                .pipe(
                    map(notification => seguimientoActions.createNotificationSuccess({notification})),
                    catchError( error => of( seguimientoActions.createNotificationError({error})))
            )))

    @Effect()
    enviarPushNotificacion: Observable<any> = this.actions$.pipe(
        ofType(seguimientoActions.sendPushNotification),
        switchMap((payload) => this._notificationService.sendMovilNotification(
                   payload.notificacion.descripcion,
                   payload.notificacion.titulo,
                   payload.seguimiento, 
                   payload.doctor)
            .pipe(
                map(msg => seguimientoActions.sendPushNotificationSuccess({msg})),
                catchError( error => of( seguimientoActions.sendPushNotificationError({error}))
            ) 
        )),
    )

    @Effect()
    atender: Observable<any> = this.actions$.pipe(
        ofType(seguimientoActions.atenderSeguimiento),
        tap( _=> this._spinner.show()),
        switchMap(({seguimiento}) => this._macarSeguimientoComoAtendido.execute(seguimiento)
            .pipe(
                map(attendedSeguimiento => {
                    this._toastService.showSuccess(`Atendido con éxito`);
                    return seguimientoActions.atenderSeguimientoSuccess({attendedSeguimiento})
                }),
                catchError( error => {
                    this._toastService.showError(`Error al atender, por inténtelo nuevamente, Error:${error.message}`);
                    return of( seguimientoActions.atenderSeguimientoError({error: error.message}))
                    }
                )
            )),
        tap( _=> this._spinner.hide()))

    // @Effect()
    // loadSeguimientosAgendados: Observable<any> = this.actions$.pipe(
    //     ofType(seguimientoActions.loadSeguimientosAgendados),
    //     tap( _=> this._spinner.show()),
    //     switchMap( _=> this._mainFacade.getHospitalSesion()),
    //     switchMap( hospitalSession => { 
    //         let filter: FiltrarSeguimientoIn = {
    //             fechaUltimos:{ 
    //                 createAt: new Date(),
    //                 isUltimos: true,
    //                 AndIdHospital:hospitalSession.idHospital._id,
    //                 AndEstado: SeguimientoEstadoEnum.AGENDADO
    //             } 
    //         }
    //         return this._verSeguimientosAgendadosUseCase.execute(filter)
    //             .pipe(
    //                 map(seguimientosAgendados => {
    //                     return seguimientoActions.loadSeguimientosAgendadosSuccess({seguimientosAgendados})
    //                 }),
    //                 catchError( error => {
    //                     this._toastService.showError(`Error al cargar seguimientos agendados, Error:${error.message}`);
    //                     return of( seguimientoActions.loadSeguimientosAgendadosError({error: error.message}))
    //                     }
    //                 )
    //             )}),
    //     tap( _=> this._spinner.hide()))

    @Effect()
    loadCitasPaciente: Observable<any> = this.actions$.pipe(
        ofType(seguimientoActions.loadCitasPaciente),
        tap( _=> this._spinner.show()),
        switchMap( ({ filter } )=> {    
            return this._verCitasUseCase.execute(filter)
                .pipe(
                    map(citas => {
                        return seguimientoActions.loadCitasPacienteSuccess({citas})
                    }),
                    catchError( error => {
                        this._toastService.showError(`Error al cargar citas, Error:${error.message}`);
                        return of( seguimientoActions.loadCitasPacienteError({error: error.message}))
                        }
                    )
                )}),
        tap( _=> this._spinner.hide()))

    @Effect()
    loadSeguimientosCompletos: Observable<any> = this.actions$.pipe(
        ofType(seguimientoActions.loadSeguimientosCompletos),
        switchMap( ({ params } )=> {    
            return this._VerResumenSeguimientosPacienteUseCase.execute(params)
                .pipe(
                    map(seguimientos => {
                        return seguimientoActions.loadSeguimientosCompletosSuccess({seguimientos})
                    }),
                    catchError( error => {
                        this._toastService.showError(`Error al cargar resumen de seguimientos, Error:${error.message}`);
                        return of( seguimientoActions.loadSeguimientosCompletosError({error: error.message}))
                        }
                    )
    )}))
}
