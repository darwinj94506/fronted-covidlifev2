import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../../core/domain/class/formulario';
import { SignupIn } from '../../core/domain/inputs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserGeneroEnum } from '../../core/domain/enums';

const ValidationMessage = {
  name: { required: 'El nombre es obligatorio', minlength:'El nombre no puede tener menos de tres caracteres' },
  lastname: { required: 'El apellido es obligatorio', minlength:'El apellido no puede tener menos de tres caracteres' },
  email: { required: 'El correo es obligatorio', email:'El correo ingresado es inválido' },
  password: { required: 'La contraseña es obligatoria', minlength:'La contraseña no puede tener menos de 6 caracteres' },
  ci: { required: 'El número de cédula es obligatorio', minlength:'La cédula o pasaporte tienen al menos 9 caracteres'},
  fechaNacimiento:{ required: 'La fecha de nacimiento es obligatoria '},
  genero: { required: 'El género es obligatorio'},
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent extends Formulario implements OnInit {

  MASCULINO:UserGeneroEnum = UserGeneroEnum.M;
  FEMENINO:UserGeneroEnum = UserGeneroEnum.F;
  signupForm: FormGroup;

  constructor( private fb: FormBuilder) {
    super({...ValidationMessage})
  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.signupForm = this.fb.group({
      name: [ '', [Validators.required,  Validators.minLength(3)] ],
      lastname: [ '', [Validators.required, Validators.minLength(3)] ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(6)] ],
      ci: [ '', [ Validators.required, Validators.minLength(9)] ],
      telefono: [''],
      fechaNacimiento: [ '', [Validators.required] ],
      genero: [ '', [Validators.required] ],
      direccion: [ '' ],
      terminosCondiciones: [false]
    });
  }

  onSubmit(){
    let fechaNacimiento : NgbDateStruct = this.signupForm.get('fechaNacimiento').value;
    let userToRegister : SignupIn = {
      name: this.signupForm.get('name').value,
      lastname: this.signupForm.get('lastname').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      ci: this.signupForm.get('ci').value,
      telefono: this.signupForm.get('telefono').value,
      fechaNacimiento: new Date(fechaNacimiento.year, (fechaNacimiento.month-1), fechaNacimiento.day),
      genero: this.signupForm.get('genero').value,
      direccion: this.signupForm.get('direccion').value,
      roles:[],
    }
  }

}
