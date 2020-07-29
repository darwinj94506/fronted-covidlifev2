import  {UserAisladoPorEnum } from '../enums';

export interface VOPacienteOut {
    aislado_por: UserAisladoPorEnum;
    alergia_medicamentos: String;
    tiene_diagnosticado_enfermedad: String;
    es_diagnosticado_cancer: boolean;
    es_embarazada: boolean;
    esta_dando_lactar: boolean;
    fue_es_fumador: boolean;
    tiene_carnet_discapacidad: boolean;
    tiene_diabetes: boolean;
    tiene_presion_alta: boolean;
    familiares_cerco: number;
}