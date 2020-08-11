import { UserStateEnum } from '../enums'
export interface DoctorSegCompOut {
    _id: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    state: UserStateEnum;
}