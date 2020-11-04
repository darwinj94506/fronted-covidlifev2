import { Component, OnInit, Input } from '@angular/core';
import { Formulario } from '../../../../core/domain/class/formulario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtenderSolicitudSeguimientoIn, EditarSeguimientoIn } from '../../../../core/domain/inputs';
import { FiltrarSeguimientoOut, 
         LoginOut,
         SeguimientoSegCompOut,
         SeguimientoCompletoPacienteOut } from '../../../../core/domain/outputs';
import { ExamenTipoEnum,  
         DificultadRespirarEnum, 
         SeguimientoEstadoEnum, 
         DiagnosticoActualEnum } from '../../../../core/domain/enums';
import { SeguimientoFacade, MainFacade } from '../../../../store/facade';
import _ from 'lodash';
const ValidationMessage = {
  observacion_doctor: { maxlength:'Una nota no puede tener más de 250 caracteres'},
  diagnostico_actual: { required: 'El diagnóstico es obligatorio'}
}

interface HistorialSeguimiento extends FiltrarSeguimientoOut{
  data: SeguimientoCompletoPacienteOut[],
  soloVer:boolean;
}

@Component({
  selector: 'app-atender-seguimiento',
  templateUrl: './atender-seguimiento.component.html',
  styleUrls: ['./atender-seguimiento.component.css']
})

export class AtenderSeguimientoComponent extends Formulario implements OnInit {
  @Input() seguimiento : HistorialSeguimiento;
  // soloVer : boolean = false;

  seguimientoForm : FormGroup;
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
    DiagnosticoActualEnum.PROBABLE,
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
    // console.log(this.seguimiento);
    this.initForm();
    this._mainFacade.getUserLogged()
    .subscribe(data=> this.doctor = {...data})
  }

  onSubmit(){
    // console.log(this.seguimientoForm.getRawValue());
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
      diagnostico_actual: this.seguimientoForm.get('diagnostico_actual').value,
      aislamiento_desde: this.seguimientoForm.get('aislamiento_desde').value,
      aislamiento_hasta: this.seguimientoForm.get('aislamiento_hasta').value
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
    console.log(this.getLastFechaAislamiento(this.seguimiento.data).aislamiento_hasta)
    this.seguimientoForm = this.fb.group({
      temperatura: [{ value: this.seguimiento.temperatura, disabled:true }],
      ritmo_cardiaco: [ { value: this.seguimiento.ritmo_cardiaco, disabled: this.isDisabled() }, [Validators.pattern("^[0-9]*$"), Validators.min(40), Validators.max(200)] ],
      saturacion_oxigeno: [{ value: this.seguimiento.saturacion_oxigeno, disabled: this.isDisabled() }, [Validators.pattern("^[0-9]*$"), Validators.min(20), Validators.max(200)] ],
      dificultad_respirar: [{ value: this.seguimiento.dificultad_respirar, disabled: this.isDisabled()}],
      examen: [{value: this.seguimiento.examen, disabled: this.isDisabled()}],
      nota_paciente: [ {value: this.seguimiento.nota_paciente, disabled:true}],
      observacion_doctor: [ {value:this.seguimiento.observacion_doctor, disabled: this.isDisabled()}, [ Validators.maxLength(250)] ],
      diagnostico_actual: [{value: this.getLastDiagnostico(), 
        disabled:this.isDisabled()},[Validators.required]],
      doctor:[ {value: this.getNameDoctor(), disabled:true}],
      evolucion: [{value: this.seguimiento.estado_diario_paciente, disabled: true}],
      aislamiento_desde: [this.getLastFechaAislamiento(this.seguimiento.data).aislamiento_desde],
      aislamiento_hasta: [this.getLastFechaAislamiento(this.seguimiento.data).aislamiento_hasta],
    });
    // console.log(this.seguimientoForm.getRawValue());
  }

  isDisabled():boolean{
    if(this.seguimiento.estado === SeguimientoEstadoEnum.SOLICITADO_CON_LLAMADA)
      return true
    return false
  }
  // si el seguimiento no tiene diagnostico significa que el doctor no ha atendido ese seguimiento
  // se necesita mostrar el último diagnóstico del paciente siempre y cuando se lo abra desde la vista de seguimientos
  // 
  getLastDiagnostico(): DiagnosticoActualEnum | null{
    /*  cuando se abre el modal desde el resumen de seguimientos, 
        debe mostrar el seguimiento como está en la bdd
    */
   if(this.seguimiento.soloVer){
     return this.seguimiento.diagnostico_actual
   }  
   else {
     //para edición, atender o agendar 
      if(!this.seguimiento.diagnostico_actual){
        let lastSegumiento = this.getLastSeguimientoConDiagnistico(this.seguimiento.data);
        // console.log(lastSegumiento);
        if(lastSegumiento){
          return lastSegumiento.diagnostico_actual
        }
        return null
      }
      else
        //cuando ya ha sido atendido
        return this.seguimiento.diagnostico_actual
    }
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
    else
      return true;
  }

  transformDate(t){
    let today = new Date(t);
    return new Date(
      today.getFullYear(), today.getUTCMonth(), today.getUTCDate(),
      today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds())
  }

  getLastSeguimientoConDiagnistico(seguimientos: SeguimientoCompletoPacienteOut[]): SeguimientoSegCompOut | null{
      let ultimoDiagnostico = null;
      let segOrd = _.chain(seguimientos)
      .flatMap(item=>item.seguimientos)
      .map(item=>({...item,createAt:this.transformDate(item.createAt)}))
      .orderBy(item=>item.createAt,'desc')
      .value();
      for(let i=0;i<segOrd.length; i++){
        if(segOrd[i].diagnostico_actual){
          ultimoDiagnostico = {...segOrd[i]}; 
          break;
        }
      }
      return ultimoDiagnostico
  }
  getLastSeguimientoConFechaAislamiento(seguimientos: SeguimientoCompletoPacienteOut[]): SeguimientoSegCompOut | null{
    let seguimiento = null;
    let segOrd = _.chain(seguimientos)
    .flatMap(item=>item.seguimientos)
    .map(item=>({...item,createAt:this.transformDate(item.createAt)}))
    .orderBy(item=>item.createAt,'desc')
    .value();
    for(let i=0;i<segOrd.length; i++){
      if(segOrd[i].aislamiento_desde && segOrd[i].aislamiento_hasta){
        // console.log([segOrd[i].aislamiento_desde, segOrd[i].aislamiento_hasta])
        seguimiento = {...segOrd[i]}; 
        break;
      }
    }
    return seguimiento
  }

  getLastFechaAislamiento(seguimientos: SeguimientoCompletoPacienteOut[]):{ aislamiento_desde: string, aislamiento_hasta:string}{
    // console.log(this.transformDate(this.seguimiento.aislamiento_desde));
    // console.log(this.transformDate(this.seguimiento.aislamiento_desde).toISOString().split('T')[0]);
    // console.log(this.seguimiento.soloVer);
    
    if(this.seguimiento.soloVer){ 
      return {
        aislamiento_desde: this.seguimiento.aislamiento_desde? 
        this.transformDate(this.seguimiento.aislamiento_desde).toISOString().split('T')[0]: null,
        aislamiento_hasta: this.seguimiento.aislamiento_hasta? 
        this.transformDate(this.seguimiento.aislamiento_hasta).toISOString().split('T')[0]: null
      }
    }
    else{
        let seguimiento = this.getLastSeguimientoConFechaAislamiento(seguimientos);
        if(seguimiento){
          let hoy = new Date();
          let hasta = this.transformDate(seguimiento.aislamiento_hasta);
          hasta.setHours(23,59,59);
          // console.log(hasta);
          if(hoy<=hasta){
            return {
              aislamiento_desde: this.transformDate(seguimiento.aislamiento_desde).toISOString().split('T')[0],
              aislamiento_hasta: this.transformDate(seguimiento.aislamiento_hasta).toISOString().split('T')[0]
            }
          }
        }else
          return { 
            aislamiento_desde: null,
            aislamiento_hasta: null
        }
      }  
    }
  
}
