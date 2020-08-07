import { PacienteFiltSegOut } from './paciente-filt-seg.out';
import { DoctorFiltSegOut } from './doctor-filt-seg.out';
import { HospitalFiltSegOut } from './hospital-filt-seg.out';
import { SeguimientoEstadoEnum, DiagnosticoActualEnum, DificultadRespirarEnum, ExamenTipoEnum, EstadoDiarioPacienteEnum} from '../enums';
export interface FiltrarSeguimientoOut {
    _id?: string; 
    idPaciente: PacienteFiltSegOut;
    idDoctor?: DoctorFiltSegOut;
    idHospital: HospitalFiltSegOut;
    estado: SeguimientoEstadoEnum;
    temperatura: number;
    ritmo_cardiaco?: number;
    saturacion_oxigeno?: number;
    dificultad_respirar: DificultadRespirarEnum;
    examen?: ExamenTipoEnum;
    nota_paciente?: String;
    observacion_doctor?: String;
    estado_diario_paciente?: EstadoDiarioPacienteEnum;
    fecha_atencion_medica?: Date;
    diagnostico_actual?: DiagnosticoActualEnum;
    latitud?: number;
    longitud?: number; 
} 
