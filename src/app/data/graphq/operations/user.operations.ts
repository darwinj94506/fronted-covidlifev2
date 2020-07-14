import { IOperations, IOperation} from '../interfaces/operation.interface';
import { REGISTER, LOGIN} from '../gql/user';

export interface IUserOperationsAuth extends IOperations{
    login: IOperation;
    register: IOperation
}  

export const USER_OPERATIONS : IUserOperationsAuth = {
    
    login: {
        resolve:'loginUser',
        gql: LOGIN
    },
    register:{
        resolve:'registerUser',
        gql: REGISTER
    },
    create:{
        resolve:'',
        gql: REGISTER
    },
    update:{
        resolve:'',
        gql: REGISTER
    },
    delete:{
        resolve:'',
        gql: REGISTER
    },
    all:{
        resolve:'',
        gql: REGISTER
    }
 
    
}

