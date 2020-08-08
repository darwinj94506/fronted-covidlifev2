import { FilterRolHospital } from './filter-rol-hospital';
import { RolesUserEnum } from '../enums/roles-user.enum';
export interface FilterUserIn{
    idEspacio?: String;
    role?: RolesUserEnum;
    emailLike?: String;
    idHospital?: String;
    roleHospital?: FilterRolHospital
}