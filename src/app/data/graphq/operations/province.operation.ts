import { IOperations } from '../interfaces/operation.interface';
import { ALL, CREATE, UPDATE, DELETE } from '../gql/province';

export const PROVINCE_OPERATIONS : IOperations = {
    all: {
        resolve:'allProvincel',
        gql: ALL
    },
    create: {
        resolve:'addProvince',
        gql: CREATE
    },
    update: {
        resolve:'updateProvince',
        gql: UPDATE
    },
    delete: {
        resolve:'deleteProvince',
        gql: DELETE
    }

}

