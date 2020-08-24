import { Component, OnInit, Input } from '@angular/core';
import { Formulario } from '../../../../core/domain/class/formulario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtenderSolicitudSeguimientoIn} from '../../../../core/domain/inputs';
import { FiltrarSeguimientoOut } from '../../../../core/domain/outputs';
import { ExamenTipoEnum,  DificultadRespirarEnum, DiagnosticoActualEnum, RolesUserEnum } from '../../../../core/domain/enums';
import { SeguimientoFacade } from '../../../../store/facade'
// const ROLE_DOCTOR: RolesUserEnum = RolesUserEnum.DOCTOR; 
const ValidationMessage = {
  observacion_doctor: { maxlength:'Una nota no puede tener más de 250 caracteres'}
}

@Component({
  selector: 'app-atender-seguimiento',
  templateUrl: './atender-seguimiento.component.html',
  styleUrls: ['./atender-seguimiento.component.css']
})

export class AtenderSeguimientoComponent extends Formulario implements OnInit {
  seguimientoForm : FormGroup;
  @Input() seguimiento: FiltrarSeguimientoOut;
  
  SI: DificultadRespirarEnum = DificultadRespirarEnum.SI;
  NO: DificultadRespirarEnum = DificultadRespirarEnum.NO;
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
  diagnosticos = [
    DiagnosticoActualEnum.AISLAMIENTO_PREVENTIVO,
    DiagnosticoActualEnum.CONFIRMADO,
    DiagnosticoActualEnum.SOSPECHOSO
  ]

  constructor( private fb: FormBuilder, private _seguimientoFacade: SeguimientoFacade ) {
    super({...ValidationMessage})
   }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(){
    let seguimiento: AtenderSolicitudSeguimientoIn = {
      _id:this.seguimiento._id,
      ritmo_cardiaco: Number(this.seguimientoForm.get('ritmo_cardiaco').value),
      saturacion_oxigeno: Number(this.seguimientoForm.get('saturacion_oxigeno').value),
      dificultad_respirar:  this.seguimientoForm.get('dificultad_respirar').value,
      examen: this.seguimientoForm.get('examen').value,
      observacion_doctor: this.seguimientoForm.get('observacion_doctor').value,
      diagnostico_actual:this.seguimientoForm.get('diagnostico_actual').value,
    }
    this._seguimientoFacade.atenderSeguimiento(seguimiento, this.seguimiento.estado);
  }

  initForm(){
    this.seguimientoForm = this.fb.group({
      temperatura: [{ value: this.seguimiento.temperatura, disabled:true }],
      ritmo_cardiaco: [ this.seguimiento.ritmo_cardiaco, [Validators.pattern("^[0-9]*$"), Validators.min(40), Validators.max(200)] ],
      saturacion_oxigeno: [ this.seguimiento.saturacion_oxigeno, [Validators.pattern("^[0-9]*$"), Validators.min(20), Validators.max(200)] ],
      dificultad_respirar: this.seguimiento.dificultad_respirar,
      examen: this.seguimiento.examen,
      nota_paciente: [ {value: this.seguimiento.nota_paciente, disabled:true}],
      observacion_doctor: [ '', [ Validators.maxLength(250)] ],
      diagnostico_actual: this.seguimiento.diagnostico_actual
    });
  }

}
