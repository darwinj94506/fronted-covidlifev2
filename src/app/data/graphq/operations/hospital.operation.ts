import { IOperations } from '../interfaces/operation.interface';
import { CREATE, UPDATE, DELETE } from '../gql/hospital';

export const HOSPITAL_OPERATIONS : IOperations = {
    create: {
        resolve:'addHospital',
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

