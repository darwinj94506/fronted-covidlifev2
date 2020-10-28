import { Component, OnInit } from '@angular/core';
import { Personal } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";
import { SignupIn, VOPacienteIn } from '../../../core/domain/inputs';
import { UserGeneroEnum, RolesUserEnum } from '../../../core/domain/enums';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Formulario } from '../../../core/domain/class/formulario';

const ValidationMessage = {
    name: { required: 'El nombre es obligatorio', minlength:'El nombre no puede tener menos de tres caracteres', maxlength:'Máximo 50 caracteres' },
    lastname: { required: 'El apellido es obligatorio', minlength:'El apellido no puede tener menos de tres caracteres', maxlength:'Máximo 50 caracteres'},
    email: { required: 'El correo es obligatorio', email:'El correo ingresado es inválido', maxlength:'Máximo 50 caracteres'},
    password: { required: 'La contraseña es obligatoria', minlength:'La contraseña no puede tener menos de 6 caracteres', maxlength:'Máximo 25 caracteres' },
    ci: { required: 'El número de cédula es obligatorio', minlength:'La cédula o pasaporte tienen al menos 10 caracteres', pattern:'Sólo se admiten números', maxlength:'Máximo 12 caracteres'},
    telefono:{ maxlength:'Máximo 10 caracteres', minlength:'Mínimo 7 caracteres', pattern:'Sólo se admiten números'},
    fechaNacimiento:{ required: 'La fecha de nacimiento es obligatoria '},
    genero: { required: 'El género es obligatorio'},
    direccion: {maxlength:'Máximo 200 caracteres'}
  }

@Component({
    selector: 'mt-wizard-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss']
})

export class PersonalComponent extends Formulario implements OnInit {
    MASCULINO: UserGeneroEnum = UserGeneroEnum.M;
    FEMENINO: UserGeneroEnum = UserGeneroEnum.F;
    PREFIERO_NO_DECIRLO: UserGeneroEnum = UserGeneroEnum.PREFIERO_NO_DECIRLO;
    signupForm: FormGroup;
    title = 'Por favor ingrese sus datos de contacto.';
    personal: Personal;
    form: any;
    constructor(private router: Router,
        private route: ActivatedRoute, private formDataService: FormDataService,
        private workflowService: WorkflowService,
        private fb: FormBuilder) {
            super({...ValidationMessage} )
    }

    ngOnInit() {
        this.initForm();
        this.personal = this.formDataService.getPersonal();
    }
    
    initForm(){
      let user = this.formDataService.getDataUser();
        this.signupForm = this.fb.group({
          name: [ user.name, [Validators.required,  Validators.minLength(3), Validators.maxLength(50)] ],
          lastname: [ user.lastname, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
          email: [ user.email, [Validators.required, Validators.email, Validators.maxLength(50)] ],
          password: [ user.password, [Validators.required, Validators.minLength(6), Validators.maxLength(25)] ],
          ci: [ user.ci, [ Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern("^[0-9]*$")] ],
          telefono: [user.telefono, [Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
          fechaNacimiento: [ user.fechaNacimiento, [Validators.required] ],
          genero: [ user.genero, [Validators.required] ],
          direccion: [ user.direccion, [Validators.maxLength(200)] ],
        });
      }
      onSubmit(){
        console.log(this.signupForm.value);
        if(!this.signupForm.valid) {
            alert("Datos inrrectos")  
            return false
        }
        this.formDataService.setUser(this.signupForm.value)
        this.router.navigateByUrl('/authentication/signup/work', { relativeTo: this.route.parent, skipLocationChange: true });
      }

    //Save button event Starts
    save(form: any) {
        if (!form.valid)
            return;

        this.formDataService.setPersonal(this.personal);

        // let firstState = this.workflowService.getFirstInvalidStep(STEPS.work);
        // if (firstState.length > 0) {          
        // };       
        this.router.navigateByUrl('/authentication/signup/work', { relativeTo: this.route.parent, skipLocationChange: true });
    }
    //Save button event Ends
}
