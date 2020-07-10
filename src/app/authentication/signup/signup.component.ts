import { Component, OnInit, Injector, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../store/auth.facade';
import { FormValidation } from '../../domain'


const ValidationMessage = {
  name: { required: 'El nombre es obligatorio', minlength:'El nombre no puede tener menos de tres caracteres' },
  lastname: { required: 'El apellido es obligatorio', minlength:'El apellido no puede tener menos de tres caracteres' },
  email: { required: 'El correo es obligatorio', email:'El correo ingresado es inválido' },
  password: { required: 'La contraseña es obligatoria', minlength:'La contraseña no puede tener menos de 6 caracteres' }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent  extends FormValidation implements OnInit, OnDestroy{
  
  signupForm: FormGroup;
  
  
  constructor( private fb: FormBuilder, private _authFacade: AuthFacade, injector: Injector ) {
    super({...ValidationMessage}, injector)
  }

  ngOnInit(){
    this.initForm();
    this.initListener();
  }
  

  initForm(){
    this.signupForm = this.fb.group({
      name: [ '', [Validators.required,  Validators.minLength(3)] ],
      lastname: [ '', [Validators.required, Validators.minLength(3)] ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ]         
    });
  }

  initListener(){
    this.suscription = this._authFacade.getAuthState()
      .subscribe(({authState})=>{
        if(authState.isLoading) this.spinner.show();
        else this.spinner.hide() 
    })
  }

  onSubmit(){
    
    let userToRegister = {
      name: this.signupForm.get('name').value,
      lastname: this.signupForm.get('lastname').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
    }
    this._authFacade.register(userToRegister)
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

}
