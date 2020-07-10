import { Injectable} from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthFacade } from './store/auth/auth.facade'
import { GuardService } from './services/guard.service';
import { Observable, of, iif} from 'rxjs';
import { map, catchError, exhaustMap, tap} from 'rxjs/operators';

@Injectable({providedIn:'root'})

export class LoginGuard implements CanActivate {

  constructor(
    private _authFacade:AuthFacade, private _guardService: GuardService
  ) {}

  
  canActivate() : Observable<boolean> {
    return this.getUserLoggedStore().pipe(
      exhaustMap(isLooged  =>
          iif(()=>isLooged, of(true), this.getLocalStorage())),
      catchError(err=>{
        this._authFacade.loadUserLoggedError();
        return of(false)
      })
    )
  }

  getUserLoggedStore():Observable<any>{
    return this._authFacade.getUserLogged().pipe(
      exhaustMap((userLogged)=>
        iif(() => userLogged.email && userLogged.email!="", of(true), of(false))  
      ))
  }

  getLocalStorage() : Observable<boolean> {
    return this._guardService.loadLocalStorage().pipe(
      tap(userLogged=> this._authFacade.loadUserLoggedSuccess({...userLogged})),
      map( userLogged=> true)
    )
  }















}




































// async canActivate() {
//   this.store.dispatch(fromActions.GetUser());
//   this.suscription = await this.store.pipe(select(fromAuth.getAuth))
//     .subscribe((state:any)=>this.userLogged = state.userLogged);
//   console.log(this.userLogged);
//   if(this.userLogged.token === "")
//     return false
//   else
//     return true  
// }
// ngOnDestroy(){
//   this.suscription.unsubscribe()
// }