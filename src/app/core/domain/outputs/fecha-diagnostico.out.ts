import { DiagnosticoActualEnum } from '../enums';
export interface FechaDiagnosticoOut {
    fecha_creacion: Date;
    diagnostico_enum: DiagnosticoActualEnum;
}