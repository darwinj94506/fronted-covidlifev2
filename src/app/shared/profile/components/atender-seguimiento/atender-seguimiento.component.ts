import { Component, OnInit, Input } from '@angular/core';
import { Formulario } from '../../../../core/domain/class/formulario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtenderSolicitudSeguimientoIn, EditarSeguimientoIn } from '../../../../core/domain/inputs';
import { FiltrarSeguimientoOut, LoginOut } from '../../../../core/domain/outputs';
import { ExamenTipoEnum,  DificultadRespirarEnum, SeguimientoEstadoEnum, 
  DiagnosticoActualEnum, RolesUserEnum } from '../../../../core/domain/enums';
import { SeguimientoFacade, MainFacade } from '../../../../store/facade'
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
  doctor : LoginOut;
  
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
    DiagnosticoActualEnum.SOSPECHOSO,
    DiagnosticoActualEnum.RECUPERADO,
    DiagnosticoActualEnum.HOSPITALIZADO,
    DiagnosticoActualEnum.FALLECIDO
  ]

  constructor( private fb: FormBuilder, 
    private _seguimientoFacade: SeguimientoFacade,
    private _mainFacade:MainFacade ) {
    super({...ValidationMessage})
   }

  ngOnInit(): void {
    console.log(this.seguimiento);
    this.initForm();
    this._mainFacade.getUserLogged().subscribe(data=> this.doctor = {...data})
  }

  onSubmit(){
    if(!this.isEditable() && this.getTextButton()==="Editar"){
      return false
    }
  

    let seguimiento: AtenderSolicitudSeguimientoIn = {
      _id:this.seguimiento._id,
      ritmo_cardiaco: Number(this.seguimientoForm.get('ritmo_cardiaco').value),
      saturacion_oxigeno: Number(this.seguimientoForm.get('saturacion_oxigeno').value),
      dificultad_respirar:  this.seguimientoForm.get('dificultad_respirar').value,
      examen: this.seguimientoForm.get('examen').value,
      observacion_doctor: this.seguimientoForm.get('observacion_doctor').value,
      diagnostico_actual:this.seguimientoForm.get('diagnostico_actual').value,
    }

    let seguimientoUpdate: EditarSeguimientoIn = {...seguimiento}

    switch(this.seguimiento.estado){
      case (SeguimientoEstadoEnum.AGENDADO):
        this._seguimientoFacade.atenderSeguimiento(seguimiento, this.seguimiento.estado);
      case (SeguimientoEstadoEnum.SOLICITADO_SIN_LLAMADA):
          this._seguimientoFacade.atenderSeguimiento(seguimiento, this.seguimiento.estado);  
      break;
      case SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA:
        this._seguimientoFacade.agendarSeguimiento(this.seguimiento, this.doctor)
      break;
      case SeguimientoEstadoEnum.REVISADO_CON_LLAMADA:
        this._seguimientoFacade.dispatchActionUpdateSeguimiento(seguimientoUpdate)
      case SeguimientoEstadoEnum.REVISADO_SIN_LLAMADA:
        this._seguimientoFacade.dispatchActionUpdateSeguimiento(seguimientoUpdate)
    }
  }

  initForm(){
    this.seguimientoForm = this.fb.group({
      temperatura: [{ value: this.seguimiento.temperatura, disabled:true }],
      ritmo_cardiaco: [ { value: this.seguimiento.ritmo_cardiaco, disabled: this.isDisabled() }, [Validators.pattern("^[0-9]*$"), Validators.min(40), Validators.max(200)] ],
      saturacion_oxigeno: [{ value: this.seguimiento.saturacion_oxigeno, disabled: this.isDisabled() }, [Validators.pattern("^[0-9]*$"), Validators.min(20), Validators.max(200)] ],
      dificultad_respirar: [{ value: this.seguimiento.dificultad_respirar, disabled: this.isDisabled()}],
      examen: [{value: this.seguimiento.examen, disabled: this.isDisabled()}],
      nota_paciente: [ {value: this.seguimiento.nota_paciente, disabled:true}],
      observacion_doctor: [ {value:this.seguimiento.observacion_doctor, disabled: this.isDisabled()}, [ Validators.maxLength(250)] ],
      diagnostico_actual: [{value: this.seguimiento.diagnostico_actual, disabled:this.isDisabled()}],
      doctor:[ {value: this.getNameDoctor(), disabled:true}],
      evolucion: [{value: this.seguimiento.estado_diario_paciente, disabled: true}]
    });
  }

  isDisabled():boolean{
    if(this.seguimiento.estado === SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA)
      return true
    return false
  }
  getNameDoctor(){
    if(this.seguimiento.idDoctor){
      if(this.seguimiento.idDoctor.name && this.seguimiento.idDoctor.name)
        return `${this.seguimiento.idDoctor.name} ${this.seguimiento.idDoctor.lastname}`
    }
    return 'SEGUIMIENTO SIN ATENDER'
     
  }
  
  getTextButton(): String{
    switch(this.seguimiento.estado){
      case SeguimientoEstadoEnum.AGENDADO:
        return 'Atender'
      case SeguimientoEstadoEnum.SOLICITADO_SIN_LLAMADA:
        return 'Atender'
      case SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA:
        return 'Agendar'
      case SeguimientoEstadoEnum.REVISADO_CON_LLAMADA:
        return 'Editar'
      case SeguimientoEstadoEnum.REVISADO_SIN_LLAMADA:
        return 'Editar'
    }
  }

  isEditable(): boolean{
    let hoy = new Date();
    let fechaSeguimiento = this.transformDate(this.seguimiento.createAt);
  
    if(hoy.toDateString() != fechaSeguimiento.toDateString()){
      alert("Este seguimiento solo se lo puede editar el mismo día de envío");
      return false;
    }
    if(!this.seguimiento.idDoctor){
      alert("Este seguimiento aún no ha sido atendido");
      return false;
    }
    return true;
  }

  transformDate(t){
    let today = new Date(t);
    return new Date(
      today.getFullYear(), today.getMonth(), today.getUTCDate(),
      today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds())
  }
  
}
