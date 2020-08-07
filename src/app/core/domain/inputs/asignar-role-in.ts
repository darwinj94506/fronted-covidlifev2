import { RolesUserEnum } from '../enums'
export interface AsignarRoleIn{
    idUser: String,
    idHospital: String,
    role: RolesUserEnum
}