import { IEntity } from './entity';
import { UserAisladoPorEnum, UserGeneroEnum, UserMotivoAltaEnum, UserStateEnum } from '../enums';

export interface IUsuarioEntity extends IEntity {
   
    name: string;
    lastname:string;
    ci:string;
    email: string;
    password: string;
    telefono?: string;
    isRoot?: boolean;
    latitud? : number;
    longitud? : number;
    direccion?: string;
    ultimoAcceso?: Date; //ultima ves q inicio sesion
    fechaNacimiento: Date;
    state: UserStateEnum;
                   
    // roles!:VORoleHospital[];
    // motivo_alta_sistema?:VOMotivoAlta;
    // datos_paciente?:VOPaciente;

    genero: UserGeneroEnum; 

}