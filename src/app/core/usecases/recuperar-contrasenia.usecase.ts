import { Injectable } from '@angular/core';
import { UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { Observable } from 'rxjs';
import { RecuperarContraseniaIn } from '../domain/inputs';
import { RecuperarContraseniaOut } from '../domain/outputs'; 

@Injectable({
  providedIn: 'root'
})

export class RecuperarContraseniaUsecase implements UseCase<RecuperarContraseniaIn, RecuperarContraseniaOut> {

  constructor(private userRepository: UsuarioRepository) { }

  execute(input: RecuperarContraseniaIn): Observable<RecuperarContraseniaOut> {
    return this.userRepository.recuperarContrasenia(input)
  }
}