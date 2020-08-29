import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import decode from 'jwt-decode';
import { MainFacade } from '../store/facade/main.facade'
import { Observable, forkJoin } from 'rxjs';
import { map} from 'rxjs/operators';
import { LoginOut, VORoleHospitalPopulateLoginOut} from '../core/domain/outputs';
import { RolesUserEnum } from '../core/domain/enums';

@Injectable({providedIn:'root'})
export class RoleGuardService implements CanActivate {
  constructor(public _auth: AuthService, 
    public router: Router,  
    private _mainFacade:MainFacade) {}
 
  canActivate(route: ActivatedRouteSnapshot) : Observable<boolean> {
      return this.getUserLoggedStore(route).pipe(
        map(userLogged =>{
            if(userLogged){
              return true
            }return this.loadFromLocalStorage(route);
          }),
      )
    }

    getUserLoggedStore(route: ActivatedRouteSnapshot):Observable<any>{
      return forkJoin([this._mainFacade.getHospitalSesion(), this._mainFacade.getUserLogged()])
          .pipe(
              map(([ hospital, userLogged])=>{
                if(!hospital.roles.includes(route.data.expectedRole)){
                  // this._auth.navigateToInit(userLogged);
                  return false
                }
                return true
              })
          )
    }

    
    loadFromLocalStorage(route): boolean {  
      console.log("load from local role guard");
      try{
          const expectedRole: RolesUserEnum = route.data.expectedRole;
          const tokenUserLogged = localStorage.getItem('token');
          const idHospitalSession = localStorage.getItem('hospitalSession');
          const tokenPayload: LoginOut = decode(tokenUserLogged);
          const hospitalSession: VORoleHospitalPopulateLoginOut = tokenPayload.roles.find(h=>h.idHospital._id === idHospitalSession)
          let roles = this.convertToRolEnum(hospitalSession.roles); 
          console.log(roles);
          if(roles.includes(expectedRole))
                return true
          // this.router.navigate(['/inicio']);            
          return false
      } catch{
        return false
      }
    }

    convertToRolEnum(rolesArray): RolesUserEnum[]{
      if (!rolesArray) return []
      let roles: RolesUserEnum[] = [];
      rolesArray.forEach(rol=>{
          switch (rol){
              case 0 :
                  roles = [...roles, RolesUserEnum.ROOT];
              break;
              case 1 : 
                  roles = [...roles,  RolesUserEnum.ADMIN];
              break;
              case 2 :
                  roles = [...roles, RolesUserEnum.PACIENTE];
              break;
              case 3:
                  roles = [...roles, RolesUserEnum.DOCTOR];
              break;
              
              case 4:
                  roles = [...roles, RolesUserEnum.DIRECTOR];
              break;
          }
      })
      return roles
  }
}






