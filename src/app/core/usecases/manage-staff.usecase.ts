import { Injectable } from '@angular/core';
import { UserRepository } from '../repositories/user.repository';
import { UseCase } from '../base/use-case';
import { SignupIn } from '../domain/inputs';
import { IUserEntity } from '../domain/entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageStaffUsecase implements UseCase<SignupIn, IUserEntity> {

  constructor(private userRepository: UserRepository) { }
  
  execute(params: SignupIn): Observable<IUserEntity> {
    return this.userRepository.register(params);
  }

  createStaff(){

  }
  
}
