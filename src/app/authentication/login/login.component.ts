import { Component, OnInit, OnDestroy, Injector} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../store/auth.facade';
import { FormValidation } from '../../domain'
// import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';


const ValidationMessage = {
  email: { required: 'El Nombre es obligatorio', email:'El correo ingresado es inválido' },
  password: { required: 'La contraseña es obligatoria', minlength:'Una contraseña tiene al menos 6 caracteres' }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends FormValidation implements OnInit, OnDestroy{

  loginForm: FormGroup;
  // suscription: Subscription;
  
  constructor( private fb: FormBuilder, private _authFacade: AuthFacade, injector: Injector) {
    super({...ValidationMessage}, injector)
  }

  ngOnInit(){
    this.initForm();
    this.initListener();
  }


  initForm(){
    this.loginForm = this.fb.group({
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ]         
    });
    console.log(this.loginForm.get('email'))
  }

  onSubmit(){
    let userToLogin = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this._authFacade.login(userToLogin)
  }

  initListener(){
    this.suscription = this._authFacade.getAuthState()
      .subscribe(({authState})=>{
        if(authState.isLoading) this.spinner.show();
        else this.spinner.hide() 
    })
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

 


}
