import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap, mergeMap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { ToastService } from '../../../services'
import * as estadisticasActions  from './estadisticas.actions';
import { VerTotalPacientesDiagnosticoUseCase, 
         VerEvolucionDiariaDiagnosticoUseCase,
         VerCoordenasPorDiagnosticoUseCase,
         VerTotalUsuariosPorRolUseCase  } from '../../../core/usecases/estadisticas';
import { RolesUserEnum } from 'src/app/core/domain/enums';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class EstadisticasEffects {
    constructor( private actions$: Actions, 
        private _verTotalPacientesDiagnosticoUseCase: VerTotalPacientesDiagnosticoUseCase,
        private _verEvolucionDiariaDiagnosticoUseCase: VerEvolucionDiariaDiagnosticoUseCase,
        private _verTotalUsuariosPorRolUseCase: VerTotalUsuariosPorRolUseCase,
        private _verCoordenasPorDiagnosticoUseCase: VerCoordenasPorDiagnosticoUseCase,
        private _toastService: ToastService,
        private _spinner: NgxSpinnerService
         ) { }
   
    @Effect()
    loadPacientesPorDiagnostico: Observable<any> = this.actions$.pipe(
        ofType(estadisticasActions.loadPacientesPorDiagnostico),
        switchMap(({input}) => this._verTotalPacientesDiagnosticoUseCase.execute(input)
            .pipe(
                map(output => {
                    return estadisticasActions.loadPacientesPorDiagnosticoSuccess({output})
                }),
                catchError( error => {
                    this._toastService.showError('error al consultar los diagnosticos, error:'+error.message)
                    return of( estadisticasActions.loadPacientesPorDiagnosticoError({error}))
                    }
                )
            ))
    )    

    @Effect()
    loadEvolucionDiariaPacientes: Observable<any> = this.actions$.pipe(
        ofType(estadisticasActions.loadEvolucionDiariaPacientes),
        switchMap(({input}) => this._verEvolucionDiariaDiagnosticoUseCase.execute(input)
            .pipe(
                map(output => {
                    return estadisticasActions.loadEvolucionDiariaPacientesSuccess({output})
                }),
                catchError( error => {
                    this._toastService.showError('error al consultar la evolución diaria, error:'+error.message)
                    return of( estadisticasActions.loadEvolucionDiariaPacientesError({error}))
                    }
                )
            ))
    )   
    
    @Effect()
    loadTotalPersonal: Observable<any> = this.actions$.pipe(
        ofType(estadisticasActions.loadTotalUsuariosPorRol),
        mergeMap(({input}) => this._verTotalUsuariosPorRolUseCase.execute(input)
            .pipe(
                map(output => {
                    return estadisticasActions.loadTotalUsuariosPorRolSuccess({output, role: input.role})
                }),
                catchError( error => {
                    this._toastService.showError(`error al cargar el total de 
                        ${input.role===RolesUserEnum.PACIENTE?'pacientes':'doctores'}, error:${error.message}`)

                    return of( estadisticasActions.loadTotalUsuariosPorRolError({error, role: input.role}))
                    }
                )
            ))
    )

    @Effect()
    loadCoordenadasPorDiagnostico: Observable<any> = this.actions$.pipe(
        ofType(estadisticasActions.loadCoordenadasPorDiagnostico),
        tap(_=> this._spinner.show()),
        switchMap(({input}) => this._verCoordenasPorDiagnosticoUseCase.execute(input)
            .pipe(
                map(output => {
                    return estadisticasActions.loadCoordenadasPorDiagnosticoSuccess({output})
                }),
                catchError( error => {
                    this._toastService.showError('Error al cargar coordenadas, error: '+error.message)

                    return of( estadisticasActions.loadCoordenadasPorDiagnosticoError({error}))
                    }
                )
               
            )),
        tap(_=> this._spinner.hide())
    )      

}

