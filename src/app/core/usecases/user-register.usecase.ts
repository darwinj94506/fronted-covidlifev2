import { Injectable } from '@angular/core';
import { UserRepository } from '../repositories/user.repository';
import { UseCase } from '../base/use-case';
import { IRegisterInput } from '../domain/inputs';
import { IUserEntity } from '../domain/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterUsecase implements UseCase<IRegisterInput, IUserEntity> {

  constructor(private userRepository: UserRepository) { }
  
  execute(params: IRegisterInput): Observable<IUserEntity> {
    return this.userRepository.register(params);
  }

}
