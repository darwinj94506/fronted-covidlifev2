import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import * as seguimientoActions  from '../actions/seguimiento.actions';
import { ToastService } from '../../services';
import { SolicitarSeguimentoUseCase } from '../../core/usecases/paciente';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SeguimientoEffects {
    constructor( private actions$: Actions, 
        private _toastService: ToastService,
        private _spinner: NgxSpinnerService,
        private _solicitarSeguimientoUseCase:SolicitarSeguimentoUseCase,
       
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
        tap( _=> this._spinner.hide()),)

   

}

