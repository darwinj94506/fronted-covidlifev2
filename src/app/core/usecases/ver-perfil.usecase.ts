import { Injectable } from '@angular/core';
import {  UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { IUsuarioEntity } from '../domain/entities';
import { Observable } from 'rxjs';
import { IdIn } from '../domain/inputs';
import { UserPerfilOut } from '../domain/outputs';

@Injectable({
  providedIn: 'root'
})

export class VerPerfilUseCase implements UseCase<IdIn, UserPerfilOut> {

  constructor(private _userRepositorio: UsuarioRepository) { }
  
  execute( id: IdIn ): Observable<UserPerfilOut> {
    return this._userRepositorio.verPerfil(id)    
  }
}
