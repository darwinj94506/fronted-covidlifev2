import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import * as seguimientoActions  from '../actions/seguimiento.actions';
import { ToastService } from '../../services';
import { SolicitarSeguimentoUseCase } from '../../core/usecases/paciente';
import { MacarSeguimientoComoAtendido,
         VerSeguimientosAgendadosUseCase, 
         MacarSeguimientoComoAgendado } from '../../core/usecases/doctor';
import { SeguimientoEstadoEnum } from '../../core/domain/enums'
import { FiltrarSeguimientoIn } from '../../core/domain/inputs'
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
        private _mainFacade : MainFacade
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
        switchMap(({seguimiento}) => this._macarSeguimientoComoAgendado.execute(seguimiento)
            .pipe(
                map(scheduledSeguimiento => {
                    this._toastService.showSuccess(`Agendado con éxito`);
                    return seguimientoActions.agendarSeguimientoSuccess({scheduledSeguimiento})
                }),
                catchError( error => {
                    this._toastService.showError(`Error al agendar, por inténtelo nuevamente, Error:${error.message}`);
                    return of( seguimientoActions.agendarSeguimientoError({error: error.message}))
                    }
                )
            )),
        tap( _=> this._spinner.hide()))

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

    @Effect()
    loadSeguimientosAgendados: Observable<any> = this.actions$.pipe(
        ofType(seguimientoActions.loadSeguimientosAgendados),
        tap( _=> this._spinner.show()),
        switchMap( _=> this._mainFacade.getHospitalSesion()),
        switchMap( hospitalSession => {
            let today = new Date();
            // today.setHours(0,0,0,0);
 
            let filter: FiltrarSeguimientoIn = {
                
                fechaUltimos:{ 
                    createAt: today,
                    isUltimos: true,
                    AndIdHospital:hospitalSession.idHospital._id,
                    AndEstado: SeguimientoEstadoEnum.AGENDADO
                } 
            }
            return this._verSeguimientosAgendadosUseCase.execute(filter)
                .pipe(
                    map(seguimientosAgendados => {
                        return seguimientoActions.loadSeguimientosAgendadosSuccess({seguimientosAgendados})
                    }),
                    catchError( error => {
                        this._toastService.showError(`Error al cargar seguimientos agendados, Error:${error.message}`);
                        return of( seguimientoActions.loadSeguimientosAgendadosError({error: error.message}))
                        }
                    )
                )}),
        tap( _=> this._spinner.hide()))
    
   

}

