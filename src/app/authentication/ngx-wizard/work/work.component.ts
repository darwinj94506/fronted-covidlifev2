// import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../data/formData.service';
import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHospitalEntity } from '../../../core/domain/entities';
import { UserAisladoPorEnum } from '../../../core/domain/enums';
import { Formulario } from '../../../core/domain/class/formulario';
import { Observable } from 'rxjs';
const  ValidationMessage = {
    // idHospital: { required: 'Campo obligatorio' },
    aislado_por: { required: 'Campo obligatorio' },
    alergia_medicamentos: { required: 'Campo obligatorio' },
    es_diagnosticado_cancer: { required: 'Campo obligatorio' },
    es_embarazada: { required: 'Campo obligatorio' },
    esta_dando_lactar: { required: 'Campo obligatorio' },
    familiares_cerco:{ required: 'Campo obligatorio', pattern:'Formato inválido', 
      max:'Es un número muy alto para ser válido'},
    fue_es_fumador: { required: 'Campo obligatorio'},
    tiene_carnet_discapacidad: { required: 'Campo obligatorio'}, 
    tiene_diabetes: { required: 'Campo obligatorio'},
    tiene_diagnosticado_enfermedad: { required: 'Campo obligatorio'},
    tiene_presion_alta: { required: 'Campo obligatorio'},
  }

@Component({
    selector: 'mt-wizard-work',
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.scss']
})

export class WorkComponent extends Formulario implements OnInit {
    title = '¿Quiere registrarse como médico?';
    workType: string;
    form: any;

    hospitalesSelect$: Observable<IHospitalEntity []>;
    cargandoHospitales$: Observable<boolean>;
    instituciones: UserAisladoPorEnum [] = [ 
        UserAisladoPorEnum.IESS,
        UserAisladoPorEnum.ISSFA,
        UserAisladoPorEnum.ISSPOL,
        UserAisladoPorEnum.MPS,
        UserAisladoPorEnum.PRIVADO
    ]
    pacienteForm: FormGroup;
    constructor(private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute, 
        public formDataService: FormDataService,
        private workflowService: WorkflowService) {
            super({...ValidationMessage})
    }

    ngOnInit() {
        this.workType = this.formDataService.getWork();
        this.initForm();
    }
    onSubmit(){
        if(this.formDataService.isDoctor)
            this.router.navigate(['result'], { relativeTo: this.route.parent, skipLocationChange: true });
        else{   
            if(this.pacienteForm.invalid){
                alert("datos inconrrectos");
                return false;
            }
            // this.pacienteForm.patchValue({ familiares_cerco: parseInt(this.pacienteForm.get('familiares_cerco').value) })
            // console.log({...this.pacienteForm.value, 
            //             familiares_cerco: parseInt(this.pacienteForm.get('familiares_cerco').value )});
            
            this.formDataService.setDataPaciente({...this.pacienteForm.value, 
                familiares_cerco: parseInt(this.pacienteForm.get('familiares_cerco').value )});
            this.router.navigate(['address'], { relativeTo: this.route.parent, skipLocationChange: true });
        }
    }

    //Save button event Starts
    save(form: any) {
        if (!form.valid)
            return;
        this.formDataService.setWork(this.workType);
        let firstState = this.workflowService.getFirstInvalidStep(STEPS.work);       
        this.router.navigate(['address'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
    //Save button event Ends

    //Cancel button event Starts
    cancel() {
        this.router.navigate(['wizard'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
    initForm(){
        let paciente = this.formDataService.getDataPaciente();
        this.pacienteForm = this.fb.group({
          isDoctor: this.formDataService.isDoctor,
        //   idHospital: ['', [Validators.required]],
          aislado_por: [paciente.aislado_por, [Validators.required]],
          alergia_medicamentos: [paciente.alergia_medicamentos, [Validators.required]],
          es_diagnosticado_cancer: [paciente.es_diagnosticado_cancer, [Validators.required]],
          es_embarazada: [paciente.es_embarazada, [Validators.required]],
          esta_dando_lactar: [paciente.esta_dando_lactar, [Validators.required]],
          familiares_cerco: [paciente.familiares_cerco, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(100)]],
          fue_es_fumador: [paciente.fue_es_fumador, [Validators.required]],
          tiene_carnet_discapacidad: [paciente.tiene_carnet_discapacidad, [Validators.required]],
          tiene_diabetes: [paciente.tiene_diabetes, [Validators.required]],
          tiene_diagnosticado_enfermedad: [paciente.tiene_diagnosticado_enfermedad, [Validators.required]],
          tiene_presion_alta: [paciente.tiene_presion_alta, [Validators.required]],
        });
      }
      onCheckboxChangeMedico(e){
          this.formDataService.setIsDoctor()
      }
}