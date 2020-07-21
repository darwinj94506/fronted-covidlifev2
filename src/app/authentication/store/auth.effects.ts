import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, mergeMap, tap, flatMap, exhaustMap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import { AuthService } from '../auth.service';
import * as authActions  from './auth.actions';
import { UserRegisterUsecase, LoginUsecase } from '../../core/usecases'

@Injectable()
export class AuthEffects {

    constructor( private actions$: Actions, 
        private _authService: AuthService,
        private _loginUseCase: LoginUsecase,
        private _userRegisterUseCase: UserRegisterUsecase) { }
        
    @Effect()
    login: Observable<any> = this.actions$.pipe(
        ofType(authActions.login),
        exhaustMap(({user}) => this._loginUseCase.execute(user).pipe(
            map((userLogged) => {
                return authActions.loginSuccess({userLogged})
            }),
            catchError( (err) => {
                console.log(err);
                return of( authActions.loginError({ error:err.error }) )
            })
        )),
    )

    @Effect({dispatch:false})
    loginSuccess: Observable<any> = this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(({userLogged})=>{         
            this._authService.saveLocalStorage({...userLogged})
            this._authService.navigateToDashboard()})
    )     

    @Effect({dispatch:false})
    loginError: Observable<any> = this.actions$.pipe(
        ofType(authActions.loginError),
        tap((err)=>{
            this._authService.showError(err)
        })
    )   

    @Effect()
    register: Observable<any> = this.actions$.pipe(
        ofType(authActions.register),
        exhaustMap(({user}) => this._userRegisterUseCase.execute(user).pipe(
            map((user) => {
                return authActions.registerSuccess({user})
            }),
            catchError( (err) => {
                return of( authActions.registerError({error:err.error}) )
            })
        )),
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

