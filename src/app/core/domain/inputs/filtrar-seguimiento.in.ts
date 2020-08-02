import { SeguimientoEstadoEnum, EstadoDiarioPacienteEnum, DiagnosticoActualEnum } from '../enums';
import { FechaUltimos } from './fecha-ultimos';
export interface FiltrarSeguimientoIn {
    fechaUltimos? :FechaUltimos;
    idPaciente?: String;
    idDoctor?: String;
    idHospital?: String;
    estado?: SeguimientoEstadoEnum;
    estado_diario_paciente?: EstadoDiarioPacienteEnum;
    diagnostico_actual?: DiagnosticoActualEnum;
}


