import { Component, OnInit, OnDestroy } from '@angular/core';
import { IEspacioEntity } from '../../../../core/domain/entities';
import { EspacioEnum } from 'src/app/core/domain/enums';
import { EspacioFacade } from '../../store/facades';
import { Observable, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html'
})
export class PlacesComponent implements OnInit, OnDestroy{
  private _destroyed$ = new Subject();
  provincias: IEspacioEntity[] = [];
  cantones: IEspacioEntity[] = [];
  parroquias: IEspacioEntity[] = [];

  cargandoProvincias$: Observable<boolean>;
  cargandoCantones$: Observable<boolean>;
  cargandoParroquias$: Observable<boolean>;

  provinciaSeleccionada: IEspacioEntity = null;
  cantonSeleccionado: IEspacioEntity = null;

  PROVINCIA: EspacioEnum = EspacioEnum.PROVINCIA;
  CANTON: EspacioEnum = EspacioEnum.CANTON;
  PARROQUIA: EspacioEnum = EspacioEnum.PARROQUIA;
   
  constructor( private _espacioFacade: EspacioFacade ) {}

  ngOnInit(){
    this.cargarProvincias();
    this.iniciarEscucha();
  }

  ngOnDestroy(){
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  iniciarEscucha(){
    this.cargandoProvincias$ = this._espacioFacade.getLoadingProvincias();
    this.cargandoCantones$ = this._espacioFacade.getLoadingCantones();
    this.cargandoParroquias$ = this._espacioFacade.getLoadingParroquias();

    this._espacioFacade.getProvincias()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => this.provincias = data);
    this._espacioFacade.getCantones()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => this.cantones = data);
    this._espacioFacade.getParroquias()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => this.parroquias = data)
  }

  cargarProvincias(){
    this._espacioFacade.cargarEspacios(EspacioEnum.PROVINCIA, null)
  }
  
  recibirProvincia(provincia: IEspacioEntity){
    this.provinciaSeleccionada = provincia;
    this.cantonSeleccionado = null;
    this.cantones = [];
    this.parroquias = [];
    this.cargarCantonesPorProvincia(provincia);
  }

  recibirCanton(canton: IEspacioEntity){
    this.cantonSeleccionado = canton;
    this.parroquias = [];
    this.cargarParroquiasPorCanton(canton);
  }

  cargarCantonesPorProvincia(provincia: IEspacioEntity){
    this._espacioFacade.cargarEspacios(EspacioEnum.CANTON, provincia._id)
  }

  cargarParroquiasPorCanton(canton: IEspacioEntity){
    this._espacioFacade.cargarEspacios(EspacioEnum.PARROQUIA, canton._id)
  }
 
}
