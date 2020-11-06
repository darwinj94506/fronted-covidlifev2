import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, mergeMap, tap, flatMap, exhaustMap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import { AuthService } from '../auth.service';
import * as authActions  from './auth.actions';
import { MainFacade } from '../../store/facade/main.facade';
import { UserRegisterUsecase, LoginUsecase, LogoutUsecase } from '../../core/usecases';
import { RolesUserEnum } from '../../core/domain/enums';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AuthEffects {

    constructor( private actions$: Actions, 
        private _authService: AuthService,
        private _loginUseCase: LoginUsecase,
        private _mainFacade: MainFacade,
        private _spinner: NgxSpinnerService,
        private _logoutUsecase: LogoutUsecase,
        private _userRegisterUseCase: UserRegisterUsecase) { }
        
    @Effect()
    login: Observable<any> = this.actions$.pipe(
        ofType(authActions.login),
        tap(_=>this._spinner.show()),
        exhaustMap(({user}) => this._loginUseCase.execute(user).pipe(
            map((userLogged) => {
                return authActions.loginSuccess({userLogged})
            }),
            catchError( (error) => {
                this._authService.showError(error.message);
                return of( authActions.loginError({ error: error.message }) )
            })
        )), 
        tap(_=>this._spinner.hide()),
    )

    @Effect({dispatch:false})
    loginSuccess: Observable<any> = this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(({userLogged})=>{         
            this._mainFacade.setUserLogged(userLogged);
            this._authService.saveLocalStorage({...userLogged})
            this._authService.navigateToInit(userLogged)})
    )     
 
    @Effect()
    register: Observable<any> = this.actions$.pipe(
        ofType(authActions.register),
        tap(_=>this._spinner.show()),
        exhaustMap((data) => this._userRegisterUseCase.execute(data.user).pipe(
            map((user) => {
                if(data.user.roles.length == 0){
                    alert("SOLICITE AL ADMINISTRADOR EL INGRESO AL SISTEMA");
                }
                return authActions.registerSuccess({user})
            }),
            catchError( (error) => {
                return of( authActions.registerError({error}) )
            })
        )),
        tap(_=>this._spinner.hide()),
    )

    @Effect({dispatch:false})
    registerSuccess: Observable<any> = this.actions$.pipe(
        ofType(authActions.registerSuccess),
        tap(({user})=>{
            this._authService.showSuccess(`${user.name} ${user.lastname} usted se ha registrado exitosamente, por favor inicie sesión`)
            this._authService.navigateToLogin()})
    ) 

    @Effect({dispatch:false})
    registerError: Observable<any> = this.actions$.pipe(
        ofType(authActions.registerError),
        tap(({error})=>{
            this._authService.showError(error)})
    )   

 

}

