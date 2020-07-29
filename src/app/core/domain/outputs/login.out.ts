import { VORoleHospitalPopulateLoginOut } from './vo-role-hospital-populate-login.out';
export interface LoginOut {
    _id: String;
    name: String;
    isRoot:boolean;
    lastname: String;
    ci: String;
    email: String;
    roles: VORoleHospitalPopulateLoginOut[]
}