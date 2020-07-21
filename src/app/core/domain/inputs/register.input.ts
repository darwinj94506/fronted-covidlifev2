import { UserGeneroEnum } from '../enums'
export interface IRegisterInput {
    name: String;
    lastname: String;
    email: String;
    password: String;   
    ci: String;
    // roles: [VORoleHospitalIn]!
    telefono: String;
    fechaNacimiento: Date;
    genero: UserGeneroEnum;
    latitud: number;
    longitud: number;
    direccion: String;
 }