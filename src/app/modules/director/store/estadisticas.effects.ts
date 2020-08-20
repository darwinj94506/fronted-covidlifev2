import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import * as estadisticasActions  from './estadisticas.actions';
import { VerTotalPacientesDiagnosticoUseCase, 
         VerEvolucionDiariaDiagnosticoUseCase,
         VerTotalUsuariosPorRolUseCase  } from '../../../core/usecases/estadisticas';


@Injectable()
export class EstadisticasEffects {
    constructor( private actions$: Actions, 
        private _verTotalPacientesDiagnosticoUseCase: VerTotalPacientesDiagnosticoUseCase,
        private _verEvolucionDiariaDiagnosticoUseCase: VerEvolucionDiariaDiagnosticoUseCase,
        private _verTotalUsuariosPorRolUseCase: VerTotalUsuariosPorRolUseCase
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
                    return of( estadisticasActions.loadEvolucionDiariaPacientesError({error}))
                    }
                )
            ))
    )   
    
    @Effect()
    loadTotalPersonal: Observable<any> = this.actions$.pipe(
        ofType(estadisticasActions.loadTotalUsuariosPorRol),
        switchMap(({input}) => this._verTotalUsuariosPorRolUseCase.execute(input)
            .pipe(
                map(output => {
                    return estadisticasActions.loadTotalUsuariosPorRolSuccess({output, role: input.role})
                }),
                catchError( error => {
                    return of( estadisticasActions.loadTotalUsuariosPorRolError({error, role: input.role}))
                    }
                )
            ))
    )    




}

