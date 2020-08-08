import { Injectable, Injector} from '@angular/core';
import { UsuarioRepository } from '../../../../core/repositories/usuario.repository';
import { ICredentialsInput, SignupIn, FilterUserIn, IdIn, AsignarRoleIn } from '../../../../core/domain/inputs';
import { MongoDBRepository} from '../mongo-repository';
import { USER_OPERATIONS } from '../../../graphq';
import { IUsuarioEntity } from '../../../../core/domain/entities';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginOut, UserPerfilOut, AsignarRoleOut, FilterUserOut} from 'src/app/core/domain/outputs';

@Injectable({ providedIn:'root'})
export class UserMDBRepository extends MongoDBRepository<IUsuarioEntity> implements UsuarioRepository{
    
    constructor(injector:Injector){
        super(USER_OPERATIONS, injector);
    }

    login (credentials: ICredentialsInput) : Observable<LoginOut>{
        return this.apollo.mutate({
            mutation: USER_OPERATIONS.login.gql,
            variables: {
                data: credentials
            },
        }).pipe(
            map(( { data } )=> data[USER_OPERATIONS.login.resolve] ))
    }

    register (user: SignupIn): Observable<IUsuarioEntity>{
        return this.apollo.mutate({
            mutation: USER_OPERATIONS.register.gql,
            variables: {
                data: user
            },
        }).pipe(
            map(( { data } )=> data[USER_OPERATIONS.register.resolve] )) 
    }

    getUsersByHospital(filtro: FilterUserIn){
        return of([]) 
    }

    logout(): Observable<boolean>{
        return of(true)
    }

    allUsers(filtro: FilterUserIn):Observable<FilterUserOut[]>{
        return this.apollo
            .watchQuery(
            { 
                query: USER_OPERATIONS.filterUsers.gql,
                variables:{
                    data:filtro
                }
            })
            .valueChanges.pipe(
                map(( { data } ) => data[USER_OPERATIONS.filterUsers.resolve] ))
    }

    verPerfil(id: IdIn):Observable<UserPerfilOut>{
        return this.apollo
            .watchQuery(
            { 
                query: USER_OPERATIONS.perfil.gql,
                variables:{
                    data:id
                }
            })
            .valueChanges.pipe(
                map(( { data } ) => data[USER_OPERATIONS.perfil.resolve] ))
    }

    asignarRole(roleIn: AsignarRoleIn):Observable<AsignarRoleOut>{

        return this.apollo.mutate({
            mutation: USER_OPERATIONS.toggle.gql,
            variables: {
                data: roleIn
            },
        }).pipe(
            map(( { data } )=> data[USER_OPERATIONS.toggle.resolve] )) 

    }

}