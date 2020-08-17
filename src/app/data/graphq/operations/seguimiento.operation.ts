import { IOperations, IOperation } from '../interfaces/operation.interface';
import { CREATE, 
        UPDATE, 
        DELETE, 
        GET_BY_ID, 
        FILTER, 
        CREATE_NOTIFICATION,
        SUSCRIPTION, 
        ATENDER_SEGUIMIENTO, 
        VER_NOTIFICACIONES_ENVIADAS, 
        GET_NOTIFICAIONES_RECIBIDAS,
        AGENDAR_SEGUIMIENTO, 
        RESUMEN_SEGUIMIENTOS_COMPLETOS,
        SUSCRIPTIONS_NOTIFICATIONS } from '../gql/seguimiento';
export interface SeguimientoOperations extends IOperations{
    filter: IOperation,
    getById: IOperation,
    suscription: IOperation,
    atender: IOperation,
    agendar: IOperation,
    resumenSeguimientos: IOperation,
    createNotification: IOperation,
    verNotificaionesEnviadas:IOperation,
    getNoficacionesRecibidas:IOperation,
    suscriptionNotificaciones:IOperation
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
    },
    createNotification:{
        resolve:'addNotificacion',
        gql: CREATE_NOTIFICATION
    },
    verNotificaionesEnviadas:{
        resolve:'getNotificacionesEnviadas',
        gql: VER_NOTIFICACIONES_ENVIADAS
    },
    getNoficacionesRecibidas:{
        resolve:'getNotificacionesRecibidas',
        gql: GET_NOTIFICAIONES_RECIBIDAS
    },
    suscriptionNotificaciones:{
        resolve:'cambioNotificacionNotif',
        gql: SUSCRIPTIONS_NOTIFICATIONS
    }
}
