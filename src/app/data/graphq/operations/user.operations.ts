import { IOperations, IOperation} from '../interfaces/operation.interface';
import { REGISTER, LOGIN, LOGOUT, FILTER_USERS, PERFIL} from '../gql/user';

export interface IUserOperationsAuth extends IOperations{
    login: IOperation;
    register: IOperation;
    logout:IOperation;
    filterUsers:IOperation;
    perfil:IOperation;
}  

export const USER_OPERATIONS : IUserOperationsAuth = {
    
    login: {
        resolve:'loginUser',
        gql: LOGIN
    },
    register:{
        resolve:'signUser',
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
    logout:{
        resolve:'logout',
        gql: LOGOUT

    },
    filterUsers:{
        resolve:'listAllUser',
        gql:FILTER_USERS
    },
    perfil:{
        resolve:'verUserPerfil',
        gql:PERFIL
    }
}

