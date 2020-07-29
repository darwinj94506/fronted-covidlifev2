import { IOperations, IOperation } from '../interfaces/operation.interface';
import { CREATE, UPDATE, DELETE, LIST_FILTER } from '../gql/hospital';
export interface HospitalOperations extends IOperations{
    listFilterHospital:IOperation
}

export const HOSPITAL_OPERATIONS : HospitalOperations = {
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
    },
    listFilterHospital:{
        resolve:'listfilterHospital',
        gql: LIST_FILTER
    }

}

