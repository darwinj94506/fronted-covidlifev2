import {Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VORoleHospital, IUsuarioEntity } from '../core/domain/entities';
import { RolesUserEnum } from '../core/domain/enums';
import { Apollo } from 'apollo-angular';
import { VORoleHospitalPopulateLoginOut } from '../core/domain/outputs';

@Injectable({providedIn:'root'})
export class AuthService {
    
    constructor( private router: Router, private toastr: ToastrService, private apollo: Apollo){}

    saveLocalStorage( userLogged: any ) {
        localStorage.setItem('token', userLogged.token);
        let userToSave = JSON.stringify(userLogged);
        localStorage.setItem('userLogged', userToSave );
    }

    saveHospitalSesion(hospitalSession: VORoleHospitalPopulateLoginOut){
        let hospitalToSave = JSON.stringify(hospitalSession)
        localStorage.setItem('hospital',hospitalToSave)
    }

    clearLocalStorage(){
        
        localStorage.removeItem('userLogged');
    }
    
    logout() {
        // this.apollo.getClient().resetStore();
        localStorage.removeItem('hospital');
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

    navigateToInit(userLogged: IUsuarioEntity){
        if(userLogged.isRoot) 
            this.router.navigate(['/root'])
        else
            this.router.navigate(['/inicio'])
    }

}

