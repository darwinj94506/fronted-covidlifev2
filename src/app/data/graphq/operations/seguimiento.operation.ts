import { IOperations, IOperation } from '../interfaces/operation.interface';
import { CREATE, UPDATE, DELETE, GET_BY_ID, FILTER, SUSCRIPTION, ATENDER_SEGUIMIENTO, AGENDAR_SEGUIMIENTO, RESUMEN_SEGUIMIENTOS_COMPLETOS } from '../gql/seguimiento';
export interface SeguimientoOperations extends IOperations{
    filter: IOperation,
    getById: IOperation,
    suscription: IOperation,
    atender: IOperation,
    agendar: IOperation,
    resumenSeguimientos: IOperation
}

export const SEGUIMIENTO_OPERATIONS : SeguimientoOperations = {
    create: {
        resolve:'addSolicitudSeguimiento',
        gql: CREATE
    },
    update: {
        resolve:'',
        gql: UPDATE
    },
    delete: {
        resolve:'',
        gql: DELETE
    },
    filter : {
        resolve:'filterSeguimiento',
        gql: FILTER 
    },
    getById: {
        resolve:'consultarUnSeguimiento',
        gql: GET_BY_ID
    },
    suscription:{
        resolve:'cambioSeguimientoNotificacion',
        gql: SUSCRIPTION
    },
    atender: {
        resolve:'atenderSolicitudSeguimiento',
        gql: ATENDER_SEGUIMIENTO
    },
    agendar : {
        resolve:'agendarSolicitudSeguimiento',
        gql:AGENDAR_SEGUIMIENTO
    },
    resumenSeguimientos: {
        resolve: 'getSeguimientoCompletoPaciente',
        gql: RESUMEN_SEGUIMIENTOS_COMPLETOS
    }
   
}
