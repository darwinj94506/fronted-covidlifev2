import {Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VORoleHospital } from '../core/domain/entities';
import { RolesUserEnum } from '../core/domain/enums';
import { Apollo } from 'apollo-angular';
import { VORoleHospitalPopulateLoginOut } from '../core/domain/outputs';

@Injectable({providedIn:'root'})

export class AuthService {
    
    constructor( private router: Router, private toastr: ToastrService,
                private apollo: Apollo){}

    saveLocalStorage( userLogged: any ) {
        localStorage.setItem('token', userLogged.token);
    }

    saveHospitalSesion(hospitalSession: VORoleHospitalPopulateLoginOut){
        let idHospital = hospitalSession.idHospital._id;
        localStorage.setItem('hospitalSession', idHospital.toString())
    }

    logout() { 
        this.apollo.getClient().cache.reset();
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
                this.router.navigate(['/root/administradores'])
            break;
            case RolesUserEnum.ADMIN:
                this.router.navigate(['/admin/personal'])
            break;
            case RolesUserEnum.DOCTOR:
                this.router.navigate(['/doctor/seguimientos'])
            break;
            case RolesUserEnum.PACIENTE:
                this.router.navigate(['/paciente/enviar-sintomas'])
            break;
                case RolesUserEnum.DIRECTOR:
                this.router.navigate(['/director/estadisticas'])
            break;
        } 
    }

    navigateToInit(userLogged){
        this.router.navigate(['/inicio'])
    }

}
