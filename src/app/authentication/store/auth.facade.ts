import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActions from './auth.actions';
import { getAuthState } from './auth.reducers';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AuthFacade {
  constructor(private store: Store<any>) {
  }

  getAuthState(){
    return this.store.select(getAuthState).pipe(tap(console.log))
  }

  login(user) {
    this.store.dispatch(authActions.login({user}))
  }

  register(user){
      this.store.dispatch(authActions.register({user}))
  }
 
}