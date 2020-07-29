import { IOperations, IOperation } from '../interfaces/operation.interface';
import { CREATE, UPDATE, DELETE, GET_BY_TYPE_ID_PADRE} from '../gql/espacio';

export interface IUserOperationsAuth extends IOperations{
    listByTypeOIdPadre: IOperation;
}  

export const ESPACIO_OPERATIONS : IUserOperationsAuth = {
    create: {
        resolve:'addEspacio',
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
    listByTypeOIdPadre: {
        resolve:'listfilterEspacio',
        gql: GET_BY_TYPE_ID_PADRE
    }

}

