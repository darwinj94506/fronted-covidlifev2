import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainFacade } from '../../store/facade';
import { IHospitalEntity } from '../../core/domain/entities';
import { UserAisladoPorEnum } from '../../core/domain/enums';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css']
})

export class DatosPacienteComponent implements OnInit {
  hospitalesSelect$: Observable<IHospitalEntity []>;
  cargandoHospitales$: Observable<boolean>;
  instituciones: UserAisladoPorEnum [] = [ 
    UserAisladoPorEnum.IESS,
    UserAisladoPorEnum.ISSFA,
    UserAisladoPorEnum.ISSPOL,
    UserAisladoPorEnum.MPS,
    UserAisladoPorEnum.PRIVADO
  ]
  ValidationMessage = {
    idHospital: { required: 'Campo obligatorio' },
    aislado_por: { required: 'Campo obligatorio' },
    alergia_medicamentos: { required: 'Campo obligatorio' },
    es_diagnosticado_cancer: { required: 'Campo obligatorio' },
    es_embarazada: { required: 'Campo obligatorio' },
    esta_dando_lactar: { required: 'Campo obligatorio' },
    familiares_cerco:{ required: 'Campo obligatorio'},
    fue_es_fumador: { required: 'Campo obligatorio'},
    tiene_carnet_discapacidad: { required: 'Campo obligatorio'}, 
    tiene_diabetes: { required: 'Campo obligatorio'},
    tiene_diagnosticado_enfermedad: { required: 'Campo obligatorio'},
    tiene_presion_alta: { required: 'Campo obligatorio'},
  }
  
  formsErrors = {
  }

  @Output()
  enviarForm = new EventEmitter<FormGroup>();

  pacientesForm: FormGroup;
  constructor( private fb: FormBuilder, private _mainFacade: MainFacade ) {

  }

  ngOnInit(){
    this.hospitalesSelect$ = this._mainFacade.getHospitales();
    this.cargandoHospitales$ = this._mainFacade.getLoadingHospitales();
    this._mainFacade.dispatchActionLoadHospitales({});
    this.initForm();
  }

  initForm(){
    this.pacientesForm = this.fb.group({
      idHospital: ['', [Validators.required]],
      aislado_por: ['', [Validators.required]],
      alergia_medicamentos: ['', [Validators.required]],
      es_diagnosticado_cancer: ['', [Validators.required]],
      es_embarazada: ['', [Validators.required]],
      esta_dando_lactar: ['', [Validators.required]],
      familiares_cerco: ['', [Validators.required]],
      fue_es_fumador: ['', [Validators.required]],
      tiene_carnet_discapacidad: ['', [Validators.required]],
      tiene_diabetes: ['', [Validators.required]],
      tiene_diagnosticado_enfermedad: ['', [Validators.required]],
      tiene_presion_alta: ['', [Validators.required]],
    });
  }

  logValidationErrors(group: FormGroup) {
    Object.keys(group.controls).forEach((key: string) => {
        const ac = group.get(key);
        this.formsErrors[key] = '';
        if (ac && !ac.valid && (ac.touched || ac.dirty)) {
            const message = this.ValidationMessage[key];
            for (const errorKey in ac.errors) {
                if (errorKey) {
                    this.formsErrors[key] += message[errorKey] + '    ';
                }
            }
        }
        if (ac instanceof FormGroup) {
            this.logValidationErrors(ac)
        }
    })
    this.enviarForm.emit(this.pacientesForm)
  }
}
