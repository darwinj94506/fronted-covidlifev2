import { Injectable } from '@angular/core';
import {  EspacioRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { IEspacioEntity } from '../../domain/entities';
import { Observable } from 'rxjs';
import { FilterEspaceIn } from '../../domain/inputs';

@Injectable({
  providedIn: 'root'
})

export class VerLugaresPorTipoCaseUse implements UseCase<FilterEspaceIn,  IEspacioEntity[]> {

  constructor(private espacioRepo: EspacioRepositorio) { }
  
  execute(filter :FilterEspaceIn): Observable<IEspacioEntity[]> {
        return this.espacioRepo.getPorTipo_O_IdPadre(filter)
  }
}
