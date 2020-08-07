import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import { GuardService } from '../../services/guard.service';
import * as mainActions  from '../actions/main.actions';
import { ToastService } from '../../services';
import { LogoutUsecase, ListarUsuariosUseCase } from '../../core/usecases';
import { AuthService } from 'src/app/authentication/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class MainEffects {
    constructor( private actions$: Actions, 
        private _toastService: ToastService,
        private _guardService: GuardService,
        private _spinner: NgxSpinnerService,
        private _logoutUsecase:LogoutUsecase,
        private _ListarUsuarios:ListarUsuariosUseCase,
        private _authService: AuthService,
        
         ) { }

    @Effect({dispatch:false})
    loadUserLoggedSuccess: Observable<any> = this.actions$.pipe(
        ofType(mainActions.loadUserLoggedSuccess),
        tap(_=>{
                this._guardService.navigateToDashboard_init()})
    ) 

    @Effect({dispatch:false})
    loadUserLoggedError: Observable<any> = this.actions$.pipe(
        ofType(mainActions.loadUserLoggedError),
        tap(_=>{
            this._guardService.navigateToLogin()})
    )
   
    @Effect()
    loadUsers: Observable<any> = this.actions$.pipe(
        ofType(mainActions.loadUsers),
        tap( _=> this._spinner.show()),
        switchMap(payload => this._ListarUsuarios.execute(payload.filter)
        .pipe(
            map(users => {
                this._spinner.hide();
                return mainActions.loadUsersSuccess({users})
            }),
            catchError( error => {
                this._spinner.hide();
                this._toastService.showError(`Error al cargar usuarios , Error:${error.message}`);
                return of( mainActions.loadUsersError())
                }
            )
        )))

   
    @Effect({dispatch:false})
    saveHospitalSession: Observable<any> = this.actions$.pipe(
        ofType(mainActions.saveHospitalSession),
        tap(({hospitalSession})=>{
                this._authService.saveHospitalSesion(hospitalSession);
                this._authService.navigateToDashboard(hospitalSession)})
    ) 

    @Effect()
    logout: Observable<any> = this.actions$.pipe(
        ofType(mainActions.logout),
        switchMap( _=> this._logoutUsecase.execute()
        .pipe(
            map( msg => {
                this._authService.logout(); 
                return mainActions.logoutSuccess();
            }),
            catchError( error => {
                this._authService.showError(error)
                return of( mainActions.logoutError())
                })
            ))
        )

}

