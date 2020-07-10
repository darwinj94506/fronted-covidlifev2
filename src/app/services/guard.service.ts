import {Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../_detail/graphq/gql/auth';
import  { Observable, throwError, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class GuardService {
    
    constructor(private apollo : Apollo, private router: Router){}

   
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
    
    logout() {
        localStorage.removeItem('userLogged');
    }

    navigateToLogin(){
        console.log("navigation to login")
        this.router.navigate(['/authentication/login'])
    }

    navigateToDashboard(){
        console.log("navigation to dashboard")
        this.router.navigate(['/root/lugares'])
    }
  

}

