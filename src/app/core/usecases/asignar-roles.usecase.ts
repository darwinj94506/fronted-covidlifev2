import { Injectable } from '@angular/core';
import {  UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { Observable } from 'rxjs';
import { AsignarRoleIn } from '../domain/inputs';
import { AsignarRoleOut} from '../domain/outputs';
@Injectable({
  providedIn: 'root'
})

export class AsignarRolesUseCase implements UseCase<AsignarRoleIn, AsignarRoleOut> {
  constructor(private _userRepositorio: UsuarioRepository) { }
  execute( roles: AsignarRoleIn ): Observable<AsignarRoleOut> {
    return this._userRepositorio.asignarRole(roles)    
  }
}
