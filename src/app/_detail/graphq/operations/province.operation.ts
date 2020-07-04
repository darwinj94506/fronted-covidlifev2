import { IOperations } from '../interfaces/operation.interface';
import { ALL, CREATE, UPDATE, DELETE } from '../gpl/province';

export const PROVINCE_OPERATIONS : IOperations = {
    all: {
        resolve:'allProvincel',
        gpl: ALL
    },
    create: {
        resolve:'addProvince',
        gpl: CREATE
    },
    update: {
        resolve:'updateProvince',
        gpl: UPDATE
    },
    delete: {
        resolve:'deleteProvince',
        gpl: DELETE
    }

    
}

