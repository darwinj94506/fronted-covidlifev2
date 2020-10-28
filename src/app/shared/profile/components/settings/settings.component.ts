import { Component, OnInit, Input } from '@angular/core';
import { UserPerfilOut } from '../../../../core/domain/outputs';
import { UpdateUserIn } from '../../../../core/domain/inputs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Formulario } from '../../../../core/domain/class/formulario';
import { UserGeneroEnum } from 'src/app/core/domain/enums';
import { EditarUsuarioUsecase } from 'src/app/core/usecases';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserFacade } from 'src/app/store/facade'
const ValidationMessage = {
  name: { required: 'El nombre es obligatorio', minlength:'El nombre no puede tener menos de tres caracteres', maxlength:'Máximo 50 caracteres' },
  lastname: { required: 'El apellido es obligatorio', minlength:'El apellido no puede tener menos de tres caracteres', maxlength:'Máximo 50 caracteres'},
  email: { required: 'El correo es obligatorio', email:'El correo ingresado es inválido', maxlength:'Máximo 50 caracteres'},
  ci: { required: 'El número de cédula es obligatorio', minlength:'La cédula o pasaporte tienen al menos 10 caracteres', pattern:'Sólo se admiten números', maxlength:'Máximo 12 caracteres'},
  telefono:{ maxlength:'Máximo 10 caracteres', minlength:'Mínimo 7 caracteres', pattern:'Sólo se admiten números'},
  fechaNacimiento:{ required: 'La fecha de nacimiento es obligatoria '},
  genero: { required: 'El género es obligatorio'},
  direccion: {maxlength:'Máximo 200 caracteres'}
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends Formulario implements OnInit {
  
  @Input () userPerfil: UserPerfilOut;
  MASCULINO: UserGeneroEnum = UserGeneroEnum.M;
  FEMENINO: UserGeneroEnum = UserGeneroEnum.F;
  PREFIERO_NO_DECIRLO: UserGeneroEnum = UserGeneroEnum.PREFIERO_NO_DECIRLO;
  form: FormGroup;
  showEditar:boolean = true;
  constructor( private fb: FormBuilder,
               private _spinner: NgxSpinnerService, 
               private _userFacade: UserFacade,
               private _editarUsuarioUsecase: EditarUsuarioUsecase ) {
    super({...ValidationMessage});
   }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      name: [ this.userPerfil.name , [Validators.required,  Validators.minLength(3), Validators.maxLength(50)] ],
      lastname: [  this.userPerfil.lastname, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      email: [  this.userPerfil.email , [Validators.required, Validators.email, Validators.maxLength(50)] ],
      ci: [  this.userPerfil.ci , [ Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern("^[0-9]*$")] ],
      telefono: [ this.userPerfil.telefono , [Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      fechaNacimiento: [  this.transformDate(this.userPerfil.fechaNacimiento) , [Validators.required] ],
      genero: [  this.userPerfil.genero , [Validators.required] ],
      direccion: [  this.userPerfil.direccion , [Validators.maxLength(200)] ],
    });
    // this.form.disable();
  }

  onSubmit(){
    // this._spinner.show();
    let data: UpdateUserIn = {
      _id: this.userPerfil._id,
      name: this.form.get('name').value,
      lastname: this.form.get('lastname').value,
      email: this.form.get('email').value,
      ci: this.form.get('ci').value,
      telefono: this.form.get('telefono').value,
      fechaNacimiento: this.form.get('fechaNacimiento').value,
      genero: this.form.get('genero').value,
      direccion: this.form.get('direccion').value
    }
    this._userFacade.dispatchEditUser(data);
    // this._editarUsuarioUsecase.execute(data).subscribe(data=>{
    //   this._spinner.hide();
    //   this.editar();
    // },err=>{
    //   this._spinner.hide();
    // })
  }

  transformDate(t){
    let today = new Date(t);  
    return new Date(
      today.getFullYear(), today.getMonth(), today.getUTCDate(),
      today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds()).toISOString().split('T')[0]
  }
  editar(){
    this.showEditar = !this.showEditar;
    if(!this.showEditar)
      this.form.enable();
    else
      this.form.disable();
  }

}
