import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import * as userActions  from '../actions/user.actions';
import { ToastService } from '../../services';
import { VerPerfilUseCase } from '../../core/usecases';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class UserEffects {
    constructor( private actions$: Actions, 
        private _toastService: ToastService,
        private _spinner: NgxSpinnerService,
        private _verPerfilUseCase:VerPerfilUseCase,
       
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
        tap( _=> this._spinner.hide()),)

   

}

