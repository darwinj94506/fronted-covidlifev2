import { DificultadRespirarEnum, ExamenTipoEnum, EstadoDiarioPacienteEnum, SeguimientoEstadoEnum} from '../enums';
export interface SolicitarSeguimientoIn {
    idHospital: String;
    temperatura: number;
    ritmo_cardiaco?: number;
    saturacion_oxigeno?: number;
    dificultad_respirar?: DificultadRespirarEnum;
    examen?: ExamenTipoEnum;
    nota_paciente?: String;
    estado: SeguimientoEstadoEnum;
    estado_diario_paciente: EstadoDiarioPacienteEnum;
    latitud?: number;
    longitud?: number;
}