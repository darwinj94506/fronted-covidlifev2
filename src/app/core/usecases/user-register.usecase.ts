import { Injectable } from '@angular/core';
import { UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { SignupIn } from '../domain/inputs';
import { IUserEntity } from '../domain/entities';
import { Observable } from 'rxjs';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterUsecase implements UseCase<SignupIn, IUserEntity> {

  constructor(private userRepository: UsuarioRepository) { }
  
  execute(user: SignupIn): Observable<IUserEntity> {
    return this.userRepository.register(user);
  }

}
