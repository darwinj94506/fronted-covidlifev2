import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { IEspacioEntity } from '../../../../../core/domain/entities';
import { EspacioEnum, CRUDEnum} from '../../../../../core/domain/enums';
import { EspacioFacade } from '../../../store/facades';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() LugarPadre: IEspacioEntity = null;
  @Input() descripcion : string = "";
  @Input() lugares : IEspacioEntity[] = [];
  @Output() emitirLugar = new EventEmitter<IEspacioEntity>();
  @Input() espacioType: EspacioEnum;
  
  constructor( private _espacioFacade:EspacioFacade ) { }

  ngOnInit(): void {

  }

  emitirLugarSeleccionado(lugar:IEspacioEntity){
    this.emitirLugar.emit(lugar)
  }

  openModalCreateUpdate(data: IEspacioEntity) {
    let lugar: IEspacioEntity;
    if(!data)
       lugar = { nombre: '', tipo: this.espacioType }
    else
      lugar = data
    this._espacioFacade.abriModalCrear_Actualizar(lugar)
  }
  
  openModalConfirm(espacio:IEspacioEntity){
    this._espacioFacade.abriModalConfirmacion(espacio);
  }

  getTolTip(espacio:IEspacioEntity):string{
    switch(espacio.tipo){
      case EspacioEnum.PROVINCIA:
        return `Ver cantones de ${espacio.nombre}`;
      case EspacioEnum.CANTON:
        return `Ver parroquias de ${espacio.nombre}`;
    }
  }

  getTitulo(): string {
    switch(this.espacioType){
      case EspacioEnum.PROVINCIA:
        return `Provincias`
      case EspacioEnum.CANTON:
          return `Cantones de la provincia ${this.LugarPadre.nombre}`
      case EspacioEnum.PARROQUIA:
          return `Parroquias del canton ${this.LugarPadre.nombre}`
    }
  }

  getDescripcion(): string {
    switch(this.espacioType){
      case EspacioEnum.PROVINCIA:
        return `Provincias actualmente registradas`
      case EspacioEnum.CANTON:
          return `Cantones de la provincia ${this.LugarPadre.nombre} actualmente registrados`
      case EspacioEnum.PARROQUIA:
          return `Parroquias del canton ${this.LugarPadre.nombre} actualmente registrados`
    }
  }

  
}
