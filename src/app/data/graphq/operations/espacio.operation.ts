import { IOperations } from '../interfaces/operation.interface';
import { ALL, CREATE, UPDATE, DELETE } from '../gql/espacio';

export const ESPACIO_OPERATIONS : IOperations = {
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
    }

}

