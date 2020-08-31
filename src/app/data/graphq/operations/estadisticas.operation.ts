import { IOperations, IOperation } from '../interfaces/operation.interface';
import { COUNT_PACIENTES, ESTADISTICAS_MAPAS } from '../gql/estadisticas';

export interface EstadisticasOPerations extends IOperations{
    getCountPacientes: IOperation,
    getEstadisticasMapas: IOperation
}

export const ESTADISTICAS_OPERATIONS: EstadisticasOPerations = {
    getCountPacientes: {
        resolve:'contadoresEstadisticos',
        gql: COUNT_PACIENTES
    },
    getEstadisticasMapas:{
        resolve:'mapasEstadisticos',
        gql: ESTADISTICAS_MAPAS
    },
    create:{
        resolve:'',
        gql: COUNT_PACIENTES
    },
    delete:{
        resolve:'',
        gql: COUNT_PACIENTES
    },
    update:{
        resolve:'',
        gql: COUNT_PACIENTES
    }

}

