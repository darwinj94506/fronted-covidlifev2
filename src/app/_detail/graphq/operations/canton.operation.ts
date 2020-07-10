import { IOperations } from '../interfaces/operation.interface';
import { ALL, CREATE, UPDATE, DELETE } from '../gql/canton';

export const CANTON_OPERATIONS : IOperations = {
    all: {
        resolve:'allCanton',
        gpl: ALL
    },
    create: {
        resolve:'addCanton',
        gpl: CREATE
    },
    update: {
        resolve:'updateCanton',
        gpl: UPDATE
    },
    delete: {
        resolve:'deleteCanton',
        gpl: DELETE
    }

    
}

