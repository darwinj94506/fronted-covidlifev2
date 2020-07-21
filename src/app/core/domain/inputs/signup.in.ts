import { UserGeneroEnum } from '../enums'
import { VORoleHospitalIn } from './vo-role-hospital.in';
export interface SignupIn {
    name: String;
    lastname: String;
    email: String;
    password: String;   
    ci: String;
    roles: VORoleHospitalIn [];
    telefono?: String;
    fechaNacimiento: Date;
    genero: UserGeneroEnum;
    latitud?: number;
    longitud?: number;
    direccion?: String;
}