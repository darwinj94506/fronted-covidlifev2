import {Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import decode from 'jwt-decode';
const helper = new JwtHelperService();
import { MainFacade } from '../store/facade/main.facade'
import { LoginOut, VORoleHospitalPopulateOut, VORoleHospitalPopulateLoginOut} from '../core/domain/outputs';
import { RolesUserEnum } from '../core/domain/enums';
@Injectable({providedIn:'root'})
export class GuardService {
    constructor(private router: Router, 
        private _mainFacade:MainFacade){}
   
    getTokenFromLocalStorage(): boolean {  
        const tokenUserLogged = localStorage.getItem('token');        
        if (this.isTokenValid()){
            const tokenPayload: any = decode(tokenUserLogged);
            console.log(tokenPayload);
            let rolesHospital: VORoleHospitalPopulateLoginOut[] = this.convertToVORoleHospitalPopulateLoginOut(tokenPayload.roles);
            
            let user = {...tokenPayload, name: tokenPayload.nombre, 
                lastname: tokenPayload.apellido,
                roles: rolesHospital }
            this._mainFacade.loadUserLoggedSuccess(user);
            return true
        } 
        else{
            this._mainFacade.loadUserLoggedError('error al cargar token de local storage') 
            return false
        }
      }

    navigateToLogin(){
        this.router.navigate(['/authentication/login']);
    }

    navigateToDashboard_init(){
        try{
            
            const tokenUserLogged = localStorage.getItem('token');  
            const tokenPayload: LoginOut = decode(tokenUserLogged);
            let hospitalSession  = localStorage.getItem('hospitalSession');

            if(hospitalSession!=="" || !tokenPayload.isRoot){
                let hospital: VORoleHospitalPopulateLoginOut = tokenPayload.roles.find(i=>i.idHospital._id===hospitalSession);
                hospital.roles = this.convertToRolEnum(hospital.roles);
                this._mainFacade.setHospitalSession(hospital);
            }else{
                this.router.navigate(['/inicio'])
            }
        }catch{
            this.router.navigate(['/inicio'])
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

    convertToVORoleHospitalPopulateLoginOut(rolesHosp): VORoleHospitalPopulateLoginOut[]{
        if(!rolesHosp) return []
        let rolesHospital: VORoleHospitalPopulateLoginOut[] = [];
        rolesHosp.forEach(element => {
            rolesHospital.push({idHospital:element.idHospital, roles: this.convertToRolEnum(element.roles)})
        });
        return rolesHospital
    }

    public isTokenValid(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return true or false
        if (token == null)
            return false;
        else 
            return !helper.isTokenExpired(token);
    }

}

