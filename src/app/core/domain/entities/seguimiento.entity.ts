import { IEntity } from './entity';
import { SeguimientoTipoEnum,
         DificultadRespirarEnum,    
         SeguimientoEstadoEnum, 
         EstadoDiarioPacienteEnum,
         DiagnosticoActualEnum,
         ExamenTipoEnum } from '../enums';

export interface ISeguimientoEntity extends IEntity {
    idPaciente:string;
    //doctor que reviso el seguimiento, sea con llamada o sin llamada
    idDoctor?:string;
    //hospital al que se envió la solicitud, solo visible para ese hospital
    idHospital:string;  
        
    //indica el tipo de seguimiento respecto a si a lo solicitado y atención
    tipo:SeguimientoTipoEnum;
    //indica el estado del seguimiento, es solicitud, cita o seguimiento concreto
    estado:SeguimientoEstadoEnum;

    //campos ingresados por paciente o doctor    
    temperatura?:number;
    ritmo_cardiaco?:number;
    saturacion_oxigeno?:number;
    dificultad_respirar?:DificultadRespirarEnum; // si o no
    
    examen?:ExamenTipoEnum;

    nota_paciente:string;
    observacion_doctor:string;

    //estado diario del paciente, se ingresa adjunto con el seguimiento, es ingresado por el paciente
    estado_diario_paciente:EstadoDiarioPacienteEnum; 


    //fecha en la un doctor atiende un seguimiento generado por el paciente
    fecha_atencion_medica:Date;    

    //tomar en cuenta la ultima atención - atendido por un doctor, esto es para el CU seguimiento diario paciente
    
    diagnostico_actual: DiagnosticoActualEnum; //estado actual 77 sospechoso confir

}