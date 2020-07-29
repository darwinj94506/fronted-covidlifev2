import { Injectable } from '@angular/core';
import { UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { ICredentialsInput } from '../domain/inputs';
import { IUsuarioEntity } from '../domain/entities';
import { LoginOut } from '../domain/outputs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginUsecase implements UseCase<ICredentialsInput, LoginOut> {

  constructor(private userRepository: UsuarioRepository) { }

  execute(params: ICredentialsInput): Observable<LoginOut> {
    return this.userRepository.login(params)
  }

}