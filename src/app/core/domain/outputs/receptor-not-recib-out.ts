import { UserStateEnum } from '../enums';
export interface ReceptorNotRecibOut {
    _id: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    state: UserStateEnum;
}