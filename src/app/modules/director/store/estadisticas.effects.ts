import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import * as estadisticasActions  from './estadisticas.actions';
import { ToastService } from '../../../services';
import { VerTotalPacientesDiagnosticoUseCase  } from '../../../core/usecases/estadisticas';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class EstadisticasEffects {
    constructor( private actions$: Actions, 
        private _toastService: ToastService,
        private _spinner: NgxSpinnerService,
        private _verTotalPacientesDiagnosticoUseCase: VerTotalPacientesDiagnosticoUseCase
         ) { }
   
    @Effect()
    loadTotalUsuarios: Observable<any> = this.actions$.pipe(
        ofType(estadisticasActions.loadTotalesPacientes),
        switchMap(({input}) => this._verTotalPacientesDiagnosticoUseCase.execute(input)
            .pipe(
                map(output => {
                    return estadisticasActions.loadTotalesPacientesSuccess({output})
                }),
                catchError( error => {
                    return of( estadisticasActions.loadTotalesPacientesError({error}))
                    }
                )
            ))
        )    
}

