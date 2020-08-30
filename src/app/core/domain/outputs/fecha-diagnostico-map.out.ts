import { DiagnosticoActualEnum } from '../enums';
export interface FechaDiagnosticoMapOut {
    fecha_creacion: Date;
    diagnostico_enum?: DiagnosticoActualEnum
}