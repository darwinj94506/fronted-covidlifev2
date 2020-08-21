import { UserAisladoPorEnum } from '../enums';
export interface VOPacienteIn {
    aislado_por: UserAisladoPorEnum;
    alergia_medicamentos: String;
    tiene_diagnosticado_enfermedad: String;
    es_diagnosticado_cancer: Boolean;
    es_embarazada: Boolean;
    esta_dando_lactar: Boolean;
    fue_es_fumador: Boolean;
    tiene_carnet_discapacidad: Boolean;
    tiene_diabetes: Boolean;
    tiene_presion_alta: Boolean;
    familiares_cerco: number;
    id_seguimiento_inicial?: String;
}