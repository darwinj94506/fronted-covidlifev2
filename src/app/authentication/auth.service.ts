import {Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN, REGISTER } from '../_detail/graphq/gql/auth';
import  { Observable, throwError, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AuthService {
    
    constructor(private apollo : Apollo, private router: Router, private toastr: ToastrService){}

    login(user): Observable<any>{
        return this.apollo.mutate({
            mutation: LOGIN,
            variables: {
                data: user
            },
        }).pipe(
            map(( { data } )=> data['loginUser'] ))
    }

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

    register(user):Observable<any>{
        return this.apollo.mutate({
            mutation: REGISTER,
            variables: {
                data: user
            },
        }).pipe(
            map(( { data } )=> data['registerUser'] ))
    }

    showSuccess(msg) {
        this.toastr.success(msg);
      }
      
    showError(msg) {
    this.toastr.error(msg);
    }



}

