import { UserGeneroEnum } from '../enums';
import { VOPacienteIn } from './vo-paciente.in';
import { VOMotivoAltaIn } from './vo-motivo-alta.in';
export interface UpdateUserIn {
    _id: String;
    name?: String;
    lastname?: String;
    ci?: String;
    email?: String;
    telefono?: String;
    fechaNacimiento?: Date;
    genero?: UserGeneroEnum;
    latitud?: number;
    longitud?: number;
    direccion?: String;
    datos_paciente?: VOPacienteIn;
    motivo_alta_sistema?: VOMotivoAltaIn;
    token_notificacion_movil?: String;
    token_notificacion_web?: String;
}