import { Injectable } from '@angular/core';
import { UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { UpdateUserIn } from '../domain/inputs';
import { EditUserOut } from '../domain/outputs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditarUsuarioUsecase implements UseCase<UpdateUserIn, EditUserOut> {

  constructor(private userRepository: UsuarioRepository) { }
  
  execute(user: UpdateUserIn): Observable<EditUserOut> {
    return this.userRepository.editarUsuario(user);
  }

}
