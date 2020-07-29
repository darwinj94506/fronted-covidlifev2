import { IHospitalEntity } from './hospital.entity';
import { RolesUserEnum } from '../enums';
export interface VORoleHospital{
    idHospital: IHospitalEntity
    roles: RolesUserEnum []
}


    