import { GenericRepository } from './generic-repository';
import { IUsuarioEntity } from '../domain/entities';
import { ICredentialsInput, SignupIn, IdIn } from '../domain/inputs'; 
import { UserPerfilOut } from '../domain/outputs'; 
import { Observable } from 'rxjs';
import { FilterUserIn, 
         AsignarRoleIn,
         ReseteoContraseniaIn, 
         RecuperarContraseniaIn } from '../domain/inputs';
import { LoginOut, AsignarRoleOut, 
         FilterUserOut, 
         ReseteoContraseniaOut,
         RecuperarContraseniaOut } from '../domain/outputs';

export abstract class UsuarioRepository extends GenericRepository<IUsuarioEntity> {
    
    abstract login(credentials: ICredentialsInput): Observable<LoginOut>;

    abstract register(userToRegister: SignupIn): Observable<IUsuarioEntity>; 
    
    abstract getUsersByHospital(filyter: any): Observable<IUsuarioEntity[]>; 

    abstract logout(): Observable<boolean>;
    // abstract logout(): Observable<String>;

    abstract allUsers(filter: FilterUserIn): Observable<FilterUserOut[]>;

    abstract verPerfil( filter: IdIn) : Observable<UserPerfilOut>;

    abstract asignarRole(filter: AsignarRoleIn) : Observable<AsignarRoleOut>;

    abstract recuperarContrasenia(input: RecuperarContraseniaIn):Observable<RecuperarContraseniaOut>;

    abstract resetearContrasenia(input: ReseteoContraseniaIn):Observable<ReseteoContraseniaOut>;

    
}