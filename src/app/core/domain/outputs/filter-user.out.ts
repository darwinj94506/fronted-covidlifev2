import { UserStateEnum, UserGeneroEnum } from '../enums';
import { VORoleHospitalPopulateOut } from './vo-role-hospital-populate.out'
export interface FilterUserOut {
    _id?: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    state: UserStateEnum;
    roles: VORoleHospitalPopulateOut[];
    telefono?: String
    isRoot: Boolean;
    ultimoAcceso?: Date;
    fechaNacimiento: Date;
    genero: UserGeneroEnum;
    latitud?: number;
    longitud?: number;
    direccion?: String
    }