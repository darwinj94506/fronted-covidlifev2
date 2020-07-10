import { Injectable } from '@angular/core';
import { Actions, Effect, ofType  } from '@ngrx/effects';
import { catchError, map, switchMap, mergeMap, tap, flatMap, exhaustMap} from 'rxjs/operators';
import { Observable, from, of} from 'rxjs';
import { GuardService } from '../../services/guard.service';
import * as authActions  from './auth.actions';

@Injectable()
export class AuthEffects {

    constructor( private actions$: Actions, 
        private _guardService: GuardService ) { }
        

    @Effect({dispatch:false})
    loadUserLoggedSuccess: Observable<any> = this.actions$.pipe(
        ofType(authActions.loadUserLoggedSuccess),
        tap(_=>{
                this._guardService.navigateToDashboard()})
    ) 

    @Effect({dispatch:false})
    loadUserLoggedError: Observable<any> = this.actions$.pipe(
        ofType(authActions.loadUserLoggedError),
        tap(_=>{
            this._guardService.navigateToLogin()})
    ) 

}

