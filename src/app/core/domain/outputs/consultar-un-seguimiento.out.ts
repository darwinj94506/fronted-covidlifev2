import { SeguimientoEstadoEnum,
         DificultadRespirarEnum, 
         ExamenTipoEnum, 
         DiagnosticoActualEnum,
         EstadoDiarioPacienteEnum } from '../enums';
import { PacienteConsulUnSegOut } from './paciente-consul-un-seg.out';
import { DoctorConsulUnSegOut } from './doctor-consult-un-seg.out';
import { HospitalConsulUnSegOut } from './hospital-consul-un-seg-out';
export interface ConsultarUnSeguimientoOut {
    _id: string;
    idPaciente: PacienteConsulUnSegOut;
    idDoctor?: DoctorConsulUnSegOut;
    idHospital: HospitalConsulUnSegOut;
    estado: SeguimientoEstadoEnum;
    temperatura: number;
    ritmo_cardiaco?: number;
    saturacion_oxigeno?: number;
    dificultad_respirar: DificultadRespirarEnum;
    examen?: ExamenTipoEnum;
    nota_paciente?: String;
    observacion_doctor?: String;
    estado_diario_paciente: EstadoDiarioPacienteEnum;
    fecha_atencion_medica: Date;
    diagnostico_actual: DiagnosticoActualEnum;
    latitud?: number;
    longitud?: number;
    createAt: Date;
}


