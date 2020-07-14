import {Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn:'root'})
export class AuthService {
    
    constructor( private router: Router, private toastr: ToastrService){}

    saveLocalStorage( userLogged: any ) {
        let userToSave = JSON.stringify(userLogged);
        localStorage.setItem('userLogged', userToSave )
    }

    clearLocalStorage(){
        localStorage.removeItem('userLogged');
    }
    
    logout() {
        localStorage.removeItem('userLogged');
    }

    navigateToDashboard(){
        this.router.navigate(['/root/lugares']);
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

}

