import { UserStateEnum, UserGeneroEnum} from '../enums';
import { VOPacienteOut } from './vo-paciente.out';
import { VORoleHospitalPopulateOut } from './vo-role-hospital-populate.out';
import { VOMotivoAltaPopulate } from './vo-motivo-alta-populate';
export interface  UserPerfilOut {
    _id: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    state?: UserStateEnum;
    roles: VORoleHospitalPopulateOut [];
    telefono: String
    isRoot: boolean;
    ultimoAcceso: Date;
    motivo_alta_sistema: VOMotivoAltaPopulate;
    fechaNacimiento: Date;
    genero: UserGeneroEnum;
    latitud?: number;
    longitud?: number;
    direccion?: String;
    datos_paciente: VOPacienteOut
    }