import { Injectable} from '@angular/core';
import { CanActivate } from '@angular/router';
import { MainFacade } from './store/facade/main.facade'
import { GuardService } from './services/guard.service';
import { Observable, of, iif} from 'rxjs';
import { map, catchError, exhaustMap, tap} from 'rxjs/operators';

@Injectable({providedIn:'root'})

export class LoginGuard implements CanActivate {

  constructor(
    private _mainFacade:MainFacade, private _guardService: GuardService
  ) {}

  canActivate() : Observable<boolean> {
    return this.getUserLoggedStore().pipe(
      exhaustMap(isLooged  =>
          iif(()=>isLooged, of(true), this.getLocalStorage())),
      catchError(err=>{
        console.log(err);
        this._mainFacade.loadUserLoggedError(err);
        return of(false)
      })
    )
  }

  getUserLoggedStore():Observable<any>{
    return this._mainFacade.getUserLogged().pipe(
      exhaustMap((userLogged)=>
        iif(() => userLogged.email && userLogged.email!="", of(true), of(false))  
      ))
  }

  getLocalStorage() : Observable<boolean> {
    // console.log("get local storage")
    return this._guardService.loadLocalStorage().pipe(
      tap(userLogged=> this._mainFacade.loadUserLoggedSuccess({...userLogged})),
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