import { Injectable } from '@angular/core';
import {  UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { IUsuarioEntity } from '../domain/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerUsuariosPorHospitalUseCase implements UseCase<any, IUsuarioEntity[]> {

  constructor(private _userRepositorio: UsuarioRepository) { }
  
  execute( filtro: any ): Observable<IUsuarioEntity[]> {
    return this._userRepositorio.getUsersByHospital(filtro)    
  }
}
