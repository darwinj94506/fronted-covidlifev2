import { IOperations, IOperation} from '../interfaces/operation.interface';
import { REGISTER, LOGIN, 
        LOGOUT, 
        FILTER_USERS, 
        PERFIL, 
        TOGGLE_ROLE,
        RESETEAR_CONTRASENIA, 
        RECUPERAR_CONTRASENIA} from '../gql/user';

export interface IUserOperationsAuth extends IOperations{
    login: IOperation;
    register: IOperation;
    logout:IOperation;
    filterUsers:IOperation;
    perfil:IOperation;
    toggle: IOperation;
    recuperar_contrasenia:IOperation;
    resetear_contrasenia:IOperation;
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
    },
    toggle:{
        resolve:'toggleRole',
        gql:TOGGLE_ROLE
    },
    recuperar_contrasenia:{
        resolve:'recuperarContrasenia',
        gql:RECUPERAR_CONTRASENIA
    },
    resetear_contrasenia:{
        resolve:'reseteoContrasenia',
        gql:RESETEAR_CONTRASENIA
    }
}

