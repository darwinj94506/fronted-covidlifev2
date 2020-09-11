import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../store/auth.facade';
import { Formulario } from '../../core/domain/class/formulario';
import { SignupIn, VOPacienteIn } from '../../core/domain/inputs';
import { UserGeneroEnum, RolesUserEnum } from '../../core/domain/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent  extends Formulario implements OnInit {

  MASCULINO: UserGeneroEnum = UserGeneroEnum.M;
  FEMENINO: UserGeneroEnum = UserGeneroEnum.F;
  PREFIERO_NO_DECIRLO: UserGeneroEnum = UserGeneroEnum.PREFIERO_NO_DECIRLO;

  @ViewChild('longContent')
  longContent: ElementRef;
  @ViewChild('content')
  content: ElementRef;

  signupForm: FormGroup;
  pacienteForm:FormGroup;

  terminosCondiciones:boolean = false;
  showDatosMedico:boolean = true;

  constructor( private fb: FormBuilder, private _authFacade: AuthFacade, private modalService: NgbModal ) {
    super({...ValidationMessage} )
  }

  ngOnInit(){
    this.initForm();
  }

  recibirFormPaciente($event){
    console.log($event);
    this.pacienteForm = $event
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

  verTerminosCondiciones(){
    this.modalService.open(this.longContent, { scrollable: true });
  }

  onSubmit(){
    if(!this.terminosCondiciones){
      this.modalService.open(this.content, { centered: true });
      return false 
    }

    let fechaNacimiento = this.signupForm.get('fechaNacimiento').value;

    let userToRegister : SignupIn = {
      name: this.signupForm.get('name').value,
      lastname: this.signupForm.get('lastname').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      ci: this.signupForm.get('ci').value,
      telefono: this.signupForm.get('telefono').value,
      fechaNacimiento: fechaNacimiento,
      genero: this.signupForm.get('genero').value,
      direccion: this.signupForm.get('direccion').value,
      roles:[],
    }

    if(this.showDatosMedico){
      if(!this.pacienteForm.valid) {
        alert("Datos incorrectos");
        return false
      }
      
      let datosPaciente : VOPacienteIn = {
        aislado_por: this.pacienteForm.get('aislado_por').value,
        alergia_medicamentos: this.pacienteForm.get('alergia_medicamentos').value,
        es_diagnosticado_cancer: this.pacienteForm.get('es_diagnosticado_cancer').value,
        es_embarazada: this.pacienteForm.get('es_embarazada').value,
        esta_dando_lactar: this.pacienteForm.get('esta_dando_lactar').value,
        familiares_cerco: Number.parseFloat(this.pacienteForm.get('familiares_cerco').value),
        fue_es_fumador: this.pacienteForm.get('fue_es_fumador').value,
        tiene_carnet_discapacidad: this.pacienteForm.get('tiene_carnet_discapacidad').value,
        tiene_diabetes:this.pacienteForm.get('tiene_diabetes').value,
        tiene_diagnosticado_enfermedad: this.pacienteForm.get('tiene_diagnosticado_enfermedad').value,
        tiene_presion_alta: this.pacienteForm.get('tiene_presion_alta').value
      }

      userToRegister = {
        ...userToRegister,
        roles:[{
          idHospital: this.pacienteForm.get('idHospital').value, 
          roles:[RolesUserEnum.PACIENTE]
        }],
        datos_paciente: { ...datosPaciente }
      }

    }

    // console.log(userToRegister);
    this._authFacade.register(userToRegister)
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.terminosCondiciones=true;
    } else {
      this.terminosCondiciones=false;
    }
  }

  onCheckboxChangeMedico(e){
    if (e.target.checked) {
      this.showDatosMedico=false;
    } else {
      this.showDatosMedico=true;
    }

  }

}
