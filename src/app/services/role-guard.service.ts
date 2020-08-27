import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import decode from 'jwt-decode';
import { MainFacade } from '../store/facade/main.facade'
import { GuardService } from '../services/guard.service';
import { Observable, of, iif, forkJoin, throwError } from 'rxjs';
import { map, catchError, exhaustMap, tap} from 'rxjs/operators';
import { LoginOut, VORoleHospitalPopulateLoginOut} from '../core/domain/outputs';
import { RolesUserEnum } from '../core/domain/enums';

@Injectable({providedIn:'root'})
export class RoleGuardService implements CanActivate {
  constructor(public _auth: AuthService, public router: Router,  private _mainFacade:MainFacade) {}
 
  canActivate(route: ActivatedRouteSnapshot) : Observable<boolean> {
      return this.getUserLoggedStore(route).pipe(
        tap(console.log),
        exhaustMap(isLooged  =>{
            if(isLooged)
            return of(true)
            else this.getLocalStorage(route)
          }),  
        catchError(err=>{
          console.log(err);
          this._mainFacade.loadUserLoggedError(err);
          return of(false)
        })
      )
    }

    getUserLoggedStore(route: ActivatedRouteSnapshot):Observable<any>{
      return forkJoin([this._mainFacade.getIsLoggedFromStore(), this._mainFacade.getHospitalSesion(), this._mainFacade.getUserLogged()])
          .pipe(
              map(([isLogged, hospital, userLogged])=>{
                if(this.isValid(isLogged, hospital, route, userLogged))
                  return true
                else false
              })
          )
    }

    isValid(isLogged: boolean, hospital: VORoleHospitalPopulateLoginOut, route: ActivatedRouteSnapshot, userLogged): boolean{
        console.log([isLogged, hospital, route])
      if(isLogged){
          if (!hospital.roles.includes(route.data.expectedRole)) {
              this._auth.navigateToInit(userLogged);
              console.log(userLogged);
            }
          return true
      }
      return false
    }


    getLocalStorage(route) : Observable<boolean> {
      return this.loadLocalStorage(route).pipe(
        tap(hospitalSession=> this._mainFacade.setHospitalSession(hospitalSession)) ,
        map( _=> true)
      )
    } 

    loadLocalStorage(route): Observable<any> {  
      try{
          const expectedRole: RolesUserEnum = route.data.expectedRole;
          const tokenUserLogged = localStorage.getItem('token');
          const idHospitalSession = localStorage.getItem('hospitalSession');
          const tokenPayload: LoginOut = decode(tokenUserLogged);
          console.log(tokenPayload);
          
          if (this._auth.isAuthenticated()) {
              this._mainFacade.setUserLogged(tokenPayload);
              const hospitalSession: VORoleHospitalPopulateLoginOut = tokenPayload.roles.find(h=>h.idHospital._id === idHospitalSession) 
              if(hospitalSession.roles.includes(expectedRole)){
                return of({...hospitalSession}) 
              }
              this.router.navigate(['/inicio']);            
            }     
          return throwError('No ha seleccionado un hospital para ingresar')  
      }catch{
        return throwError('error al obtener del local storage')
      }
    }

}






