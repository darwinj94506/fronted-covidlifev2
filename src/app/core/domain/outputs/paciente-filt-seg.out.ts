import { UserStateEnum } from '../enums';
export interface PacienteFiltSegOut {
    _id: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    state: UserStateEnum;
    token_notificacion_web: string;
    token_notificacion_movil: string;
}


