import { Injectable } from '@angular/core';
import { UsuarioRepository } from '../repositories';
import { UseCase } from '../base/use-case';
import { Observable } from 'rxjs';
import { ReseteoContraseniaIn } from '../domain/inputs';
import { ReseteoContraseniaOut } from '../domain/outputs'; 

@Injectable({
  providedIn: 'root'
})

export class ResetearContraseniaUsecase implements UseCase<ReseteoContraseniaIn, ReseteoContraseniaOut> {

  constructor(private userRepository: UsuarioRepository) { }

  execute(input: ReseteoContraseniaIn): Observable<ReseteoContraseniaOut> {
    return this.userRepository.resetearContrasenia(input)
  }
}