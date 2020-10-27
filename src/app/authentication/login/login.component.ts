import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../store/auth.facade';
import { Formulario } from '../../core/domain/class/formulario'
import { ICredentialsInput } from '../../core/domain/inputs';
import { RecuperarContraseniaUsecase } from '../../core/usecases';
import { NgxSpinnerService } from 'ngx-spinner'; 
const ValidationMessage = {
  email: { required: 'El Nombre es obligatorio', email:'El correo ingresado es inválido' },
  password: { required: 'La contraseña es obligatoria', minlength:'Una contraseña tiene al menos 6 caracteres' }
}
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends Formulario implements OnInit{
  loginForm: FormGroup;
  loginform = true;
  recoverform = false;
  emailRecupCont: String = '';
  
  constructor( private fb: FormBuilder,
               private _spinner: NgxSpinnerService,
               private _recuperarContraseniaUsecase:RecuperarContraseniaUsecase,
               private _authFacade: AuthFacade) {
    super({...ValidationMessage})
  }

  ngOnInit(){
    this.initForm();
  }
  
  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  initForm(){
    this.loginForm = this.fb.group({
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ]         
    });
  }

  onSubmit(){
    let userToLogin : ICredentialsInput = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this._authFacade.login(userToLogin)
  }

  recuperarContrasenia(){
    this._spinner.show();
    this._recuperarContraseniaUsecase.execute({email: this.emailRecupCont})
      .subscribe(data=>{
        this._spinner.hide();
        alert("Se ha enviado un mensaje a su correo");
      },err=>{
        this._spinner.hide();
        alert(err);
        console.log(err);
      })
  }
  
}
