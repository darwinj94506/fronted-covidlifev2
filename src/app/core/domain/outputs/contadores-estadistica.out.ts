import { CountPacientesPorDiagnosticoOut } from './count-pacientes-por-diagnostico.out';
import { CountPacientesPorDiaPorDiagnosticoOut } from './count-pacientes-por-dia-por-diagnostico.out';
export interface ContadoresEstadisticaOut {
    countPacientesPorDiagnostico?: CountPacientesPorDiagnosticoOut [];
    countPacientesPorDiaPorDiagnosticoOut?: CountPacientesPorDiaPorDiagnosticoOut [];
    countUserPorRoleAndHospital?: number;
}