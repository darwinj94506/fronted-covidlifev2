import { UserStateEnum } from '../enums';
export interface ReceptorNotEnvOut {
    _id: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    state: UserStateEnum;
}