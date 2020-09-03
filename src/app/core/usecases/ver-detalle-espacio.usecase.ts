import { Injectable } from '@angular/core';
import {  EspacioRepositorio } from '../repositories';
import { UseCase } from '../base/use-case';
import { Observable } from 'rxjs';
import { VerEspacioIn } from '../domain/inputs';
import { VerEspacioOut } from '../domain/outputs';
@Injectable({
  providedIn: 'root'
})

export class VerDetalleEspacioUseCase implements UseCase<VerEspacioIn, VerEspacioOut> {

  constructor(private _espacioRepositorio: EspacioRepositorio ) { }
  
  execute( filter: VerEspacioIn ): Observable<VerEspacioOut> {
    return this._espacioRepositorio.verDetalleEspacio(filter)    
  }
}
