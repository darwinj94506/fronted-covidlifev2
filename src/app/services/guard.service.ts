import {Injectable } from '@angular/core';
import  { Observable, throwError, of} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable({providedIn:'root'})
export class GuardService {
    constructor(private router: Router, private _authService:AuthService){}
   
    loadLocalStorage(): Observable<any> {  
        try{
            let userLogged = JSON.parse(localStorage.getItem('userLogged'));
            if(userLogged.email &&  userLogged.email != ""){
                console.log(userLogged)
                return of({...userLogged}) 
            }       
            return throwError('No esta alamacenado en local storage logueado')  
        
        }catch{
          return throwError('error al obtener del local storage')
        }
    }
    
    clearLocalStorage(){
        localStorage.removeItem('userLogged');
    }
    
    navigateToLogin(){
        this.router.navigate(['/authentication/login']);
    }

    navigateToDashboard_init(){
        try{
            let hospitalSession  = JSON.parse(localStorage.getItem('hospital'));
            if(hospitalSession._idHospital &&  hospitalSession._idHospital._id != "")
                this._authService.navigateToDashboard(hospitalSession);       
            this.router.navigate(['/inicio'])
        }catch{
            this.router.navigate(['/inicio'])
        } 
    }


}

