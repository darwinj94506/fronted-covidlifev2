import { Injectable } from '@angular/core';
import {  EspacioRepositorio } from '../../repositories';
import { UseCase } from '../../base/use-case';
import { IEspacioEntity } from '../../domain/entities';
import { Observable } from 'rxjs';
import { EspacioEnum } from '../../domain/enums';

@Injectable({
  providedIn: 'root'
})

export class VerLugaresPorTipoCaseUse implements UseCase<EspacioEnum, IEspacioEntity | IEspacioEntity[]> {

  constructor(private espacioRepo: EspacioRepositorio) { }
  
  execute(espacio:EspacioEnum, id?: string | number ): Observable<IEspacioEntity[]> {
        if(id) 
            return this.espacioRepo.getPorTipo_Y_IdEspacio(espacio, id)
        else 
            return this.espacioRepo.getProvincias()
  }
}
