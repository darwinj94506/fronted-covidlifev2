import { DificultadRespirarEnum, ExamenTipoEnum, DiagnosticoActualEnum} from '../enums';
export interface AtenderSolicitudSeguimientoIn{
_id: String;
ritmo_cardiaco?: number;
saturacion_oxigeno?: number
dificultad_respirar?: DificultadRespirarEnum
examen?: ExamenTipoEnum;
observacion_doctor?: String;
diagnostico_actual?: DiagnosticoActualEnum;
}