import { UserStateEnum } from '../enums';
export interface EmisorConsulNotOut {
    _id: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    state: UserStateEnum;
}