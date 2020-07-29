import { Injectable } from '@angular/core';
import {  UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { IUsuarioEntity } from '../domain/entities';
import { Observable } from 'rxjs';
import { FilterUserIn } from '../domain/inputs';

@Injectable({
  providedIn: 'root'
})

export class ListarUsuariosUseCase implements UseCase<FilterUserIn, IUsuarioEntity[]> {

  constructor(private _userRepositorio: UsuarioRepository) { }
  
  execute( filter: FilterUserIn ): Observable<IUsuarioEntity[]> {
    return this._userRepositorio.allUsers(filter)    
  }
}
