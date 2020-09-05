import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { MainFacade } from '../../../../store/facade';
import { EstadisticasFacade } from '../../store/estadisticas.facade';
import { MapasDatosIn } from '../../../../core/domain/inputs';
import { EstadisticaTipoEnum, DiagnosticoActualEnum } from '../../../../core/domain/enums';
import { MapasPacientesPorDiagnosticoOut } from '../../../../core/domain/outputs';
import { SeguimientoMapsOut } from 'src/app/core/domain/outputs/seguimiento-maps.out';
import { VerDetalleEspacioUseCase } from 'src/app/core/usecases';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterModalComponent } from '../../../../modules/director/components/filter-modal/filter-modal.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements AfterViewInit, OnInit, OnDestroy{
title: String = 'Seleccione una opción'
espacios = [];
hospital;
coordenadasPorDiagnostico: MapasPacientesPorDiagnosticoOut[] = [];
map: google.maps.Map;
heatmap: google.maps.visualization.HeatmapLayer;
@ViewChild('mapWrapper', {static: false}) mapElement: ElementRef;
private _destroyed$ = new Subject();
modalFilter: NgbModalRef;
constructor( private _mainFacade: MainFacade,
             private _verDetalleEspacioUseCase: VerDetalleEspacioUseCase,
             private _spinner: NgxSpinnerService,
             private _toast: ToastService,
             private _modalService: NgbModal,
             private _estadisticaFacade: EstadisticasFacade){
}

ngAfterViewInit() {
  this.initMap();
}

ngOnInit(){
  this._estadisticaFacade.getCoordenadasPorDiagnosticoFromStorage()
    .pipe(takeUntil(this._destroyed$))
    .subscribe(data=>{
      console.log(data);
      this.coordenadasPorDiagnostico = data.mapaPacientesPorDiagnostico;
  })

  this._mainFacade.getHospitalSesion().subscribe(hospital=> {
    this.hospital = hospital;
    let filtro: MapasDatosIn = {
      tipo: EstadisticaTipoEnum.COUNT_PACIENTES_POR_DIAGNOSTICO,
      idHospital: hospital.idHospital._id }
    this._estadisticaFacade.distpachActionLoadCoordenadasPorDiagnostico(filtro)
  })
}
  
initMap(): void {
  this.map = new google.maps.Map(this.mapElement.nativeElement, {
    zoom: 13,
    center: { lat: -0.929675, lng: -78.605851 },
    mapTypeId: "satellite"
    
  });

  this.heatmap = new google.maps.visualization.HeatmapLayer({
    data: this.getPoints(),
    map: this.map
  });
}


toggleHeatmap() {
  this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
}


// Heatmap data: 500 Points
  getPoints() {
    return [
    
    ];
  }

  confirmados(){
    this.configMap(DiagnosticoActualEnum.CONFIRMADO);
  } 

  sospechosos(){
   this.configMap(DiagnosticoActualEnum.SOSPECHOSO);
  }

  configMap(diagnostico: DiagnosticoActualEnum): void{
    let arrayCoords = this.coordenadasPorDiagnostico.find(item=> item.agrupadoPor.diagnostico_enum === diagnostico);
    
    let gMCoords = []
    let bounds  = new google.maps.LatLngBounds();
    if(arrayCoords !=undefined && arrayCoords !=null){
      arrayCoords.contador.forEach(item=>{
      if(item.latitud!=null && item.longitud!=null){
          let coord = new google.maps.LatLng(item.latitud, item.longitud);
          bounds.extend(coord);
          gMCoords.push(coord);
        }
      })
    }
    this.getTitle(diagnostico, gMCoords.length);
    if (gMCoords.length >0 ){
      this.map.fitBounds(bounds);          
      this.map.panToBounds(bounds);   
      this.setMap([...gMCoords])
    } else {
      // si no existen coordenadas
      let coordenada = new google.maps.LatLng(-0.929675, -78.605851)
      bounds.extend(coordenada);
      this.map.fitBounds(bounds);  
      this.map.setZoom(13);              
    }
  }

  recuperados(){
    this.configMap(DiagnosticoActualEnum.RECUPERADO);
  }

  fallecidos(){
    this.configMap(DiagnosticoActualEnum.FALLECIDO);
  }

  hospitalizados(){
    this.configMap(DiagnosticoActualEnum.HOSPITALIZADO);
  }

  setMap(data: google.maps.LatLng[]){
    this.heatmap.setData(data);
  }

  getTitle(diagnostico: DiagnosticoActualEnum, total: number){
    switch(diagnostico){
      case DiagnosticoActualEnum.CONFIRMADO:
        this.title=`${total} paciente${total!==1?'s':''} confirmado${total!==1?'s':''}`
      break;
      case DiagnosticoActualEnum.SOSPECHOSO:
        this.title=`${total} paciente${total!==1?'s':''}  sospechoso${total!==1?'s':''}`
      break;
      case DiagnosticoActualEnum.RECUPERADO:
        this.title=`${total} paciente${total!==1?'s':''}  recuperado${total!==1?'s':''}`
      break;
      case DiagnosticoActualEnum.FALLECIDO:
        this.title=`${total} paciente${total!==1?'s':''}  fallecido${total!==1?'s':''}`
      break;
      case DiagnosticoActualEnum.HOSPITALIZADO:
        this.title=`${total} paciente${total!==1?'s':''}  hospitalizado${total!==1?'s':''}`
      break;
    }
  }
  openModalFilter(){
		this._spinner.show();
		this._verDetalleEspacioUseCase.execute({idEspacio:this.hospital.idHospital.idEspacio})
			.pipe(takeUntil(this._destroyed$))
			.subscribe(data=>{
				this._spinner.hide()
				this.modalFilter = this._modalService.open(FilterModalComponent);
				this.modalFilter.componentInstance.espacio = {...data};
        this.modalFilter.componentInstance.idHospital = this.hospital.idHospital._id;
        this.modalFilter.componentInstance.forMapas = true;
        this.modalFilter.result.then(espacios=>{
					this.espacios = espacios;
				}).catch(_=> console.log("salio"))
			}, error=>{
				this._toast.showError('Error el cargar, error:'+error.message);
				this._spinner.hide()
			});	
    } 
    ngOnDestroy(){
      this._destroyed$.next();
      this._destroyed$.complete();
      }

  
}


