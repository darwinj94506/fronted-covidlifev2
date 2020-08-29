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
    return this._mainFacade.getIsLoggedFromStore().pipe(
      map(isLooged  => {
        if(isLooged)
          return true
        else this._guardService.getTokenFromLocalStorage()
      }),
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