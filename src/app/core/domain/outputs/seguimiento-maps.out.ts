import {SeguimientoEstadoEnum, 
    DificultadRespirarEnum, 
    EstadoDiarioPacienteEnum,
    DiagnosticoActualEnum,
    ExamenTipoEnum} from '../enums';
export interface SeguimientoMapsOut {
    _id: String;
    idPaciente: String;
    idDoctor?: String;
    idHospital: String;
    estado: SeguimientoEstadoEnum;
    temperatura: number
    ritmo_cardiaco?: number;
    saturacion_oxigeno?: number;
    dificultad_respirar: DificultadRespirarEnum;
    examen?: ExamenTipoEnum
    nota_paciente?: String
    observacion_doctor?: String
    estado_diario_paciente?: EstadoDiarioPacienteEnum
    fecha_atencion_medica?: Date
    diagnostico_actual: DiagnosticoActualEnum
    latitud?: number
    longitud?: number
    createAt: Date;
    }