import { Component, OnInit } from '@angular/core';
import { VerDetalleEspacioUseCase} from '../../core/usecases';
import { MainFacade } from '../../store/facade';
import { EspacioEnum } from '../../core/domain/enums';
import { ToastService} from '../../services';
import { NgxSpinnerService } from 'ngx-spinner';
import { flatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-info-hospital',
  templateUrl: './info-hospital.component.html',
  styleUrls: ['./info-hospital.component.css']
})
export class InfoHospitalComponent implements OnInit {

  lugar = [null, null, null, null]; 
  hospital;
  constructor(  private _verDetalleEspacioUseCase: VerDetalleEspacioUseCase,
                private _toast:ToastService,
                private _spinner: NgxSpinnerService,
                private _main: MainFacade) { }
  ngOnInit(): void {
    this._main.getHospitalSesion().pipe(
      tap(_=>this._spinner.show()),
      flatMap(hospital=>{
        this.hospital = hospital;
        return this._verDetalleEspacioUseCase.execute({idEspacio:hospital.idHospital.idEspacio})
      })).subscribe(lugar=>{
        switch(lugar.tipo){
          case EspacioEnum.PROVINCIA:
            this._spinner.hide();
            this.lugar[0] = lugar;
          break;
          case EspacioEnum.CANTON:
            this.lugar[1] = lugar;
            this._verDetalleEspacioUseCase.execute({idEspacio:lugar.idEspacio})
              .subscribe(provincia=>{ 
                this._spinner.hide();
                this.lugar[0] = provincia
              },error=>{
                this._spinner.hide();
                this._toast.showError("Error al cargar, error: "+error.message)
                })
          break;
          case EspacioEnum.PARROQUIA:
            this.lugar[2] = lugar;
            this._verDetalleEspacioUseCase.execute({idEspacio:lugar.idEspacio}).pipe(
              flatMap(canton=>{
                this.lugar[1] = canton 
                return this._verDetalleEspacioUseCase.execute({idEspacio: canton.idEspacio})
              })
            ).subscribe(provincia=>{
              this._spinner.hide();
              this.lugar[0] = provincia ;
            },error=>{
              this._toast.showError("Error al cargar, error: "+error.message)
              this._spinner.hide();
            })
          break;
          case EspacioEnum.BARRIO:
            this.lugar[3] = lugar
            this._verDetalleEspacioUseCase.execute({idEspacio:lugar.idEspacio}).pipe(
              flatMap(parroquia=>{
                this.lugar[2] = parroquia
                return this._verDetalleEspacioUseCase.execute({idEspacio:parroquia.idEspacio})
              }),
              flatMap(canton=>{
                this.lugar[1] = canton;
                return this._verDetalleEspacioUseCase.execute({idEspacio:canton.idEspacio})
              })
            ).subscribe(data=>{
              this._spinner.hide();
              this.lugar[0] = data
            },error=>{
              this._toast.showError("Error al cargar, error: "+error.message)
              this._spinner.hide();
            })
          break;
        }
      },error=>{
        this._toast.showError("Error al cargar, error: "+error.message)
        this._spinner.hide();
      })
  }
}
