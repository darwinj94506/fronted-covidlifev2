import { UserGeneroEnum, UserStateEnum} from '../enums'
import { VORoleHospitalMapUserOut } from './vo-role-hospital-map-user.out';
export interface MapUserOut {
    _id?: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    state: UserStateEnum;
    roles: VORoleHospitalMapUserOut [];
    telefono?: String
    isRoot?: Boolean
    ultimoAcceso?: Date;
    fechaNacimiento: Date;
    genero: UserGeneroEnum;
    latitud?: number;
    longitud?: number;
    direccion?: String;
}