import { IEntity } from '../entities';
import { SeguimientoTipoEnum,
         DificultadRespirarEnum,    
         SeguimientoEstadoEnum, 
         EstadoDiarioPacienteEnum,
         DiagnosticoActualEnum,
         ExamenTipoEnum } from '../enums';

export interface ISeguimientoResponse extends IEntity {
    idPaciente:string;
    idDoctor:string;
    idHospital:string;          
    tipo:SeguimientoTipoEnum;
    estado:SeguimientoEstadoEnum;
    paciente:{
        nombre:string;
        apellido:string;
    }

    //campos ingresados por paciente o doctor    
    temperatura?:number;
    ritmo_cardiaco?:number;
    saturacion_oxigeno?:number;
    dificultad_respirar?:DificultadRespirarEnum; // si o no
    
    examen?:ExamenTipoEnum;

    nota_paciente:string;
    observacion_doctor:string;
    estado_diario_paciente:EstadoDiarioPacienteEnum; 
    fecha_atencion_medica:Date;        
    diagnostico_actual: DiagnosticoActualEnum; //estado actual 77 sospechoso confir

}