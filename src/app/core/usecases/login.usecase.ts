import { Injectable } from '@angular/core';
import { UserRepository } from '../repositories/user.repository';
import { UseCase } from '../base/use-case';
import { IUserEntity } from '../domain/entities';
import { ICredentialsInput } from '../domain/inputs';
import { IUserResponse } from '../domain/responses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginUsecase implements UseCase<ICredentialsInput, IUserResponse> {

  constructor(private userRepository: UserRepository) { }

  execute(params: ICredentialsInput): Observable<IUserResponse> {
    return this.userRepository.login(params)
  }

}