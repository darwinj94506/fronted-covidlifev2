import { IEntity } from './entity';
import { VORoleHospital } from './vo-role-hospital';
import { VOMotivoAlta } from './vo-motivo-alta';
import { VOPaciente } from './vo-paciente';
import { UserGeneroEnum,
         UserStateEnum } from '../enums';

export interface IUsuarioEntity extends IEntity {
    name: string;
    lastname:string;
    ci:string;
    email: string;
    password: string;
    telefono?: string;
    isRoot: boolean;
    latitud? : number;
    longitud? : number;
    direccion?: string;
    ultimoAcceso?: Date;
    fechaNacimiento: Date;
    state: UserStateEnum;
    roles: VORoleHospital[];              
    motivo_alta_sistema?:VOMotivoAlta;
    datos_paciente?:VOPaciente;
    genero: UserGeneroEnum; 

}

