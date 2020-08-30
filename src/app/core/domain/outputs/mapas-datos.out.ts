import { MapasPacientesPorDiagnosticoOut } from './mapas-pacientes-por-diagnostico.out';
import { MapasPacientesPorDiaPorDiagnosticoOut } from './mapas-pacientes-por-dia-por-diagnostico.out';
import { MapUserOut } from './map-user.out';
export interface MapasDatosOut {
    mapaPacientesPorDiagnostico?: MapasPacientesPorDiagnosticoOut [];
    mapaPacientesPorDiaPorDiagnosticoOut?: MapasPacientesPorDiaPorDiagnosticoOut [];
    mapaUserPorRoleAndHospital?: MapUserOut [];
}