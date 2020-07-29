import { RolesUserEnum } from '../enums';
import { HospitalPopulateOut } from './hospital-populate-out';
export interface  VORoleHospitalPopulateOut {
    idHospital: HospitalPopulateOut;
    roles: RolesUserEnum[]
}