import { IOperations } from '../interfaces/operation.interface';
import { ALL, CREATE, UPDATE, DELETE } from '../gql/parroquia';

export const PARROQUIA_OPERATIONS : IOperations = {
    all: {
        resolve:'allParroquia',
        gpl: ALL
    },
    create: {
        resolve:'addParroquia',
        gpl: CREATE
    },
    update: {
        resolve:'updateParroquia',
        gpl: UPDATE
    },
    delete: {
        resolve:'deleteParroquia',
        gpl: DELETE
    }

    
}

