import { Injectable } from '@angular/core';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { UseCase } from '../base/use-case';
import { SignupIn } from '../domain/inputs';
import { IUserEntity } from '../domain/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageStaffUsecase implements UseCase<SignupIn, IUserEntity> {

  constructor(private _usuarioRepository: UsuarioRepository) { }
  
  execute(params: SignupIn): Observable<IUserEntity> {
    return this._usuarioRepository.register(params);
  }

  createStaff(){

  }
  
}
