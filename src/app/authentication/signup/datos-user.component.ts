import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../../core/domain/class/formulario';
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
  selector: 'app-datos-user',
  templateUrl: './datos-user.component.html',
  styleUrls: ['./datos-user.component.css']
})
export class DatosUserComponent  {
 


}
