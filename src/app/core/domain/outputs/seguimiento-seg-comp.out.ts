import { DificultadRespirarEnum, ExamenTipoEnum, SeguimientoEstadoEnum,
    EstadoDiarioPacienteEnum, DiagnosticoActualEnum} from '../enums';
import { DoctorSegCompOut } from './doctor-seg-comp.out';
import { PacienteSegCompOut } from './paciente-seg-com.out';
import { HospitalSegCompOut } from './hospital-seg-comp.out'

export interface SeguimientoSegCompOut {
    _id: String;
    idPaciente: PacienteSegCompOut
    idDoctor: DoctorSegCompOut
    idHospital: HospitalSegCompOut
    estado: SeguimientoEstadoEnum;
    temperatura: number;
    ritmo_cardiaco?: number;
    saturacion_oxigeno?: number;
    dificultad_respirar: DificultadRespirarEnum;
    examen?: ExamenTipoEnum;
    nota_paciente?: String;
    observacion_doctor?: String;
    estado_diario_paciente?: EstadoDiarioPacienteEnum;
    fecha_atencion_medica: Date;
    diagnostico_actual?: DiagnosticoActualEnum;
    latitud?: number;
    longitud?: number;
    createAt: Date;
    aislamiento_desde: Date;
    aislamiento_hasta: Date;
}