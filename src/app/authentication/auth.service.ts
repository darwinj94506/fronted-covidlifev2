import {Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VORoleHospital } from '../core/domain/entities';
import { RolesUserEnum } from '../core/domain/enums';
import { Apollo } from 'apollo-angular';
import { VORoleHospitalPopulateLoginOut } from '../core/domain/outputs';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
@Injectable({providedIn:'root'})

export class AuthService {
    
    constructor( private router: Router, private toastr: ToastrService,
                private apollo: Apollo){}

    saveLocalStorage( userLogged: any ) {
        console.log(userLogged);
        localStorage.setItem('token', userLogged.token);
        let userToSave = JSON.stringify(userLogged);
        localStorage.setItem('userLogged', userToSave );
    }

    saveHospitalSesion(hospitalSession: VORoleHospitalPopulateLoginOut){
        // let hospitalToSave = JSON.stringify(hospitalSession)
        let idHospital = hospitalSession.idHospital._id;
        localStorage.setItem('hospitalSession', idHospital.toString())
    }

    clearLocalStorage(){
        
        localStorage.removeItem('userLogged');
    }
    
    logout() { 
        this.apollo.getClient().resetStore();
        localStorage.removeItem('hospitalSession');
        localStorage.removeItem('userLogged');
        localStorage.removeItem('token');
        this.navigateToLogin();
    }

    navigateToLogin(){
        this.router.navigate(['/authentication/login']);
    }

    showSuccess(msg) {
        this.toastr.success(msg);
    }
      
    showError(msg) {
        this.toastr.error(msg);
    }

    navigateToDashboard(hospitalSession: VORoleHospital){
        switch(hospitalSession.roles[0]){
            case RolesUserEnum.ROOT:
                this.router.navigate(['/root'])
            break;
            case RolesUserEnum.ADMIN:
                this.router.navigate(['/admin'])
            break;
            case RolesUserEnum.DOCTOR:
                this.router.navigate(['/doctor'])
            break;
            case RolesUserEnum.PACIENTE:
                this.router.navigate(['/paciente'])
            break;
                case RolesUserEnum.DIRECTOR:
                this.router.navigate(['/director'])
            break;
        } 
    }

    navigateToInit(userLogged){
        
        if(userLogged.isRoot) 
            this.router.navigate(['/root'])
        else
            this.router.navigate(['/inicio'])

    
    
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return true or false

        if (token == null){
            return false;
        } else {
        return !helper.isTokenExpired(token);
        }
    }
}
