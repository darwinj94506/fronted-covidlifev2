import { UserStateEnum } from '../enums';
export interface PacienteSegCompOut {
    _id: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    state: UserStateEnum;
    token_notificacion_movil?: String;
    token_notificacion_web?: String;
}