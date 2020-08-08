import { Injectable } from '@angular/core';
import {  UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { Observable } from 'rxjs';
import { FilterUserIn } from '../domain/inputs';
import { FilterUserOut } from '../domain/outputs';
@Injectable({
  providedIn: 'root'
})

export class BuscarUsuarioUseCase implements UseCase<FilterUserIn, FilterUserOut[]> {

  constructor(private _userRepositorio: UsuarioRepository) { }
  
  execute( filter: FilterUserIn ): Observable<FilterUserOut[]> {
    return this._userRepositorio.allUsers(filter)    
  }
}
