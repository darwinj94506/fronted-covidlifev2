import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import * as authActions from './auth.actions';
// import { AuthState, getUserLogged } from './auth.reducers';
import { AppState, selectUserLogged }from '../app.reducers';

@Injectable({
  providedIn: 'root'
})

export class AuthFacade {
  constructor(private store: Store<any>) {
    console.log("auth facade");
  }

  // login(user) {
  //   this.store.dispatch(authActions.login({user}))
  // }

  loadUserLoggedSuccess(userLogged){
    this.store.dispatch(authActions.loadUserLoggedSuccess({userLogged}))
  }

  loadUserLoggedError(){
    this.store.dispatch(authActions.loadUserLoggedError())
  }

  getUserLogged():Observable<any>{
    return this.store.select(selectUserLogged).pipe(first());

    // return this.store.select(selectUserLogged).pipe(tap(console.log))
  }
}