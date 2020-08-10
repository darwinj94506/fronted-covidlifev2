import { UserGeneroEnum } from '../enums'
import { VORoleHospitalIn } from './vo-role-hospital.in';
import { VOPacienteIn } from './vo-paciente.in';
export interface SignupIn {
    name: String;
    lastname: String;
    ci: String;
    email: String;
    password: String;   
    roles: VORoleHospitalIn [];
    telefono?: String;
    fechaNacimiento: Date;
    genero: UserGeneroEnum;
    latitud?: number;
    longitud?: number;
    direccion?: String;
    datos_paciente?: VOPacienteIn
    token_notificacion_movil?: String
    token_notificacion_web?: String
}


// type SignupIn {
//     name: String!
//     lastname: String!
//     ci: String!
//     email: String!
//     password: String!
//     roles: [VORoleHospitalIn]!
//     telefono: String
//     fechaNacimiento: DateTime!
//     genero: UserGeneroEnum!
//     latitud: Float
//     longitud: Float
//     direccion: String
//     datos_paciente: VOPacienteIn
//     token_notificacion_movil: String
//     token_notificacion_web: String
//     }