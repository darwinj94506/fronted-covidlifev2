import { DificultadRespirarEnum, DiagnosticoActualEnum, ExamenTipoEnum} from '../enums';
export interface EditarSeguimientoIn {
    _id: String;
    ritmo_cardiaco?: number;
    saturacion_oxigeno?: number;
    dificultad_respirar?: DificultadRespirarEnum;
    examen?: ExamenTipoEnum;
    observacion_doctor?: String;
    diagnostico_actual?: DiagnosticoActualEnum;
    aislamiento_desde?: Date;
    aislamiento_hasta?: Date;
}