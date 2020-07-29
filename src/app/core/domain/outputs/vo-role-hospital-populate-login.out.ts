import { RolesUserEnum } from '../enums';
import { HospitalPopulateLoginOut } from './hospital-populate-login.out';

export interface  VORoleHospitalPopulateLoginOut {
    idHospital: HospitalPopulateLoginOut;
    roles: RolesUserEnum [];
}