import { Injectable } from '@angular/core';
import { UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LogoutUsecase implements UseCase<void, String> {

  constructor(private userRepository: UsuarioRepository) { }

  execute(): Observable<String> {
    return this.userRepository.logout()
  }
}