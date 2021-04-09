import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamenTipoEnum, EstadoDiarioPacienteEnum, DificultadRespirarEnum, SeguimientoEstadoEnum } from '../../../../core/domain/enums';
import { Formulario } from '../../../../core/domain/class/formulario';
import { SolicitarSeguimientoIn } from '../../../../core/domain/inputs';
import { MainFacade, SeguimientoFacade } from '../../../../store/facade';
import { VORoleHospitalPopulateLoginOut } from '../../../../core/domain/outputs';
const ValidationMessage = {
    temperatura: { required: 'La temperatura es ogligatoria', min:'Es un número muy bajo para ser una temperatura válida', max:'Es un número muy alto para ser una temperatura válida', pattern:'Sólo se admiten números' },
    ritmo_cardiaco: { required: 'Este campo es obligatorio', min:'Es un número muy bajo para ser válido', max:'Es un número muy alto para ser válido', pattern:'Sólo se admiten números'},
    saturacion_oxigeno: { required: 'Este campo es obligatorio', min:'Es un número muy bajo para ser válido', max:'Es un número muy alto para ser válido', pattern:'Sólo se admiten números' },
    dificultad_respirar: { required: 'Este campo es obligatorio' },
    nota_paciente: { maxlength:'Una nota no puede tener más de 250 caracteres'},
    estado:{ required: 'Campo obligatorio' },
    estado_diario_paciente:{ required: 'El estado diario es un campo obligatorio'},
  }

@Component({
  selector: 'app-medical-appointments',
  templateUrl: './medical-appointments.component.html',
  styleUrls: ['./medical-appointments.component.css']
})
export class MedicalAppointmentsComponent extends Formulario implements OnInit {
  hospitalSesion: VORoleHospitalPopulateLoginOut;

  SI: DificultadRespirarEnum = DificultadRespirarEnum.SI;
  NO: DificultadRespirarEnum = DificultadRespirarEnum.NO;
  SOLICITADO_CON_LLAMADA: SeguimientoEstadoEnum = SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA;
  SOLICITADO_SIN_LLAMADA: SeguimientoEstadoEnum = SeguimientoEstadoEnum.SOLICITADO_SIN_LLAMADA;
  estadoDiario = [ EstadoDiarioPacienteEnum.EMPEORANDO, EstadoDiarioPacienteEnum.IGUAL_EVOLUCION, EstadoDiarioPacienteEnum.MEJOR_EVOLUCION];
  tiposExamen = [ExamenTipoEnum.NO_REQUIERE,
                 ExamenTipoEnum.SOLICITADA,
                 ExamenTipoEnum.PCR_INDETERMINADA,
                 ExamenTipoEnum.PCR_TR_NEGATIVA,
                 ExamenTipoEnum.PCR_TR_POSITIVA,
                 ExamenTipoEnum.P_RAPIDA_IGC_POSITIVA,
                 ExamenTipoEnum.P_RAPIDA_IGG_E_IGM_NEGATIVA,
                 ExamenTipoEnum.P_RAPIDA_IGG_E_IGM_POSITIVA,
                 ExamenTipoEnum.P_RAPIDA_IGM_POSITIVA,
                 ExamenTipoEnum.P_RAPIDA_IGM_POSITIVA,
                 ExamenTipoEnum.P_RAPIDA_INDETERMINADA,
                 ];
  seguimientoForm : FormGroup;
  

  constructor( private fb: FormBuilder, private _mainFacade: MainFacade,
               private _seguimientoFacade: SeguimientoFacade){
      super({...ValidationMessage})
  }
  ngOnInit() {
    this.initForm();
    this._mainFacade.getHospitalSesion().subscribe( hospital=> this.hospitalSesion = hospital)
  }

  initForm(){
    this.seguimientoForm = this.fb.group({
        temperatura: [ '', [ Validators.required, Validators.pattern("[+-]?([0-9]*[.])?[0-9]+"), Validators.min(30), Validators.max(45)] ],
        ritmo_cardiaco: [ null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(40), Validators.max(200)] ],
        saturacion_oxigeno: [ null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(2), Validators.max(100)] ],
        dificultad_respirar: [ '', [Validators.required]],
        examen: [null],
        nota_paciente: [ '', [ Validators.maxLength(250)] ],
        estado: ['', Validators.required],
        estado_diario_paciente:['', Validators.required ]
      });
  }

  onSubmit(){
    let solitarSeguimiento: SolicitarSeguimientoIn = {
      idHospital:this.hospitalSesion.idHospital._id,
      temperatura: Number(this.seguimientoForm.get('temperatura').value),
      ritmo_cardiaco: Number(this.seguimientoForm.get('ritmo_cardiaco').value),
      saturacion_oxigeno: Number(this.seguimientoForm.get('saturacion_oxigeno').value),
      dificultad_respirar:  this.seguimientoForm.get('dificultad_respirar').value,
      examen: this.seguimientoForm.get('examen').value,
      nota_paciente: this.seguimientoForm.get('nota_paciente').value,
      estado: this.seguimientoForm.get('estado').value,
      estado_diario_paciente: this.seguimientoForm.get('estado_diario_paciente').value,
    }
    this._seguimientoFacade.createSeguimiento(solitarSeguimiento);
  }
}
