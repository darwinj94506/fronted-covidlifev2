import { VORoleHospitalUserWithoutSegOut } from './vo-role-hospital-user-without-seg.out';
export interface UsuarioSinSeguimientoPorDiaOut{
    _id: String;
    name: String;
    lastname: String;
    ci: String;
    email: String;
    roles: VORoleHospitalUserWithoutSegOut [];
}