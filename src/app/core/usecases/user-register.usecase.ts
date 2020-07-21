import { Injectable } from '@angular/core';
import { UserRepository } from '../repositories/user.repository';
import { UseCase } from '../base/use-case';
import { SignupIn } from '../domain/inputs';
import { IUserEntity } from '../domain/entities';
import { Observable } from 'rxjs';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterUsecase implements UseCase<SignupIn, IUserEntity> {

  constructor(private userRepository: UserRepository) { }
  
  execute(user: SignupIn): Observable<IUserEntity> {
    return this.userRepository.register(user);
  }

}
