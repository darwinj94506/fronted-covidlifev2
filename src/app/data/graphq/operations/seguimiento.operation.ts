import { IOperations, IOperation } from '../interfaces/operation.interface';
import { CREATE, UPDATE, DELETE } from '../gql/seguimiento';
export interface SeguimientoOperations extends IOperations{
    
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
   

}
