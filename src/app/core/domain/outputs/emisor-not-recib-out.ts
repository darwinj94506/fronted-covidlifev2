import { UserStateEnum } from '../enums/user-state.enum';
export interface  EmisorNotRecibOut {
    _id: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    state: UserStateEnum;
}