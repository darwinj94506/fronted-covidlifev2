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
  barrios: IEspacioEntity[] = [];

  cargandoProvincias$: Observable<boolean>;
  cargandoCantones$: Observable<boolean>;
  cargandoParroquias$: Observable<boolean>;
  cargandoBarrios$: Observable<boolean>;

  provinciaSeleccionada: IEspacioEntity = null;
  cantonSeleccionado: IEspacioEntity = null;
  parroquiaSeleccionada: IEspacioEntity = null;

  PROVINCIA: EspacioEnum = EspacioEnum.PROVINCIA;
  CANTON: EspacioEnum = EspacioEnum.CANTON;
  PARROQUIA: EspacioEnum = EspacioEnum.PARROQUIA;
  BARRIO: EspacioEnum = EspacioEnum.BARRIO;
   
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
    this.cargandoBarrios$ = this._espacioFacade.getLoadingBarrios();

    this._espacioFacade.getProvincias()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => this.provincias = data);
    this._espacioFacade.getCantones()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => this.cantones = data);
    this._espacioFacade.getParroquias()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => this.parroquias = data);
    this._espacioFacade.getBarrios()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(data => this.barrios = data)
  }

  cargarProvincias(){
    this._espacioFacade.cargarEspacios(EspacioEnum.PROVINCIA, null)
  }
  
  recibirProvincia(provincia: IEspacioEntity){
    this.provinciaSeleccionada = provincia;
    this.cantonSeleccionado = null;
    this.parroquiaSeleccionada = null;
    this.cantones = [];
    this.parroquias = [];
    this.barrios = [];
    this.cargarCantonesPorProvincia(provincia);
  }

  recibirCanton(canton: IEspacioEntity){
    this.cantonSeleccionado = canton;
    this.parroquiaSeleccionada = null;
    this.parroquias = [];
    this.barrios = [];
    this.cargarParroquiasPorCanton(canton);
  }

  recibirParroquia(parroquia: IEspacioEntity){
    this.parroquiaSeleccionada = parroquia;
    this.barrios = [];
    this.cargarBarriosPorParroquia(parroquia);
  }

  cargarCantonesPorProvincia(provincia: IEspacioEntity){
    this._espacioFacade.cargarEspacios(EspacioEnum.CANTON, provincia._id)
  }

  cargarParroquiasPorCanton(canton: IEspacioEntity){
    this._espacioFacade.cargarEspacios(EspacioEnum.PARROQUIA, canton._id)
  }

  cargarBarriosPorParroquia(barrio: IEspacioEntity){
    this._espacioFacade.cargarEspacios(EspacioEnum.BARRIO, barrio._id)
  }
 
}
