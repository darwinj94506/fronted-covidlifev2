import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
// import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { EstadisticasFacade } from '../../store/estadisticas.facade';
import { MainFacade } from '../../../../store/facade';
import { ContadoresEstadisticaIn, 
	     VerEspacioIn } from '../../../../core/domain/inputs';
import { ContadoresEstadisticaOut, 
		 CountPacientesPorDiaPorDiagnosticoOut, 
		 VORoleHospitalPopulateLoginOut } from '../../../../core/domain/outputs';
import { EstadisticaTipoEnum, RolesUserEnum, DiagnosticoActualEnum } from '../../../../core/domain/enums';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as _ from "lodash";
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { VerDetalleEspacioUseCase } from '../../../../core/usecases';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../../../services';

import { FilterModalComponent } from '../../../../modules/director/components/filter-modal/filter-modal.component';

// declare var require: any;
// const data: any = require('./data.json');

interface ItemChart {
	data: Array<number>,
	label: String 
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements AfterViewInit, OnInit, OnDestroy {
	private _destroyed$ = new Subject();
	espacios = [];

	contadoresEstadisticas$: Observable<ContadoresEstadisticaOut>;
	isLoadingChartEvolucionDiariaPacietes$:Observable<boolean>;
	isLoadingPacientesPorDiagnostico$:Observable<boolean>;
	isLoadingTotalDoctores$:Observable<boolean>;
	isLoadingTotalPacientes$:Observable<boolean>;
	totalDoctores$: Observable <number>;
	totalPacientes$: Observable <number>;
	subtitle: string;
	modalFilter: NgbModalRef;
	hospital: VORoleHospitalPopulateLoginOut;

	constructor( private _estadisticasFacade: EstadisticasFacade,
				 private _modalService: NgbModal,
				 private _verDetalleEspacioUseCase: VerDetalleEspacioUseCase,
				 private _spinner: NgxSpinnerService,
				 private _toast: ToastService,
				 private _mainFacade: MainFacade) {
		this.subtitle = 'This is some text within a card block.';
	}

	public dataDiaDiagnostico: Array<any> = [];


	public lineChartDataPacientes : Array<ItemChart> = [
		{ data: [], label: 'Confirmados' },
		{ data: [], label: 'Sospechosos' },
		// { data: [], label: 'Aislados' }
	];
	public lineChartLabelsDays : Array<String>;
	public lineChartOptions: any = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true
					},
					gridLines: {
						color: 'rgba(0, 0, 0, 0.1)'
					}
				}
			],
			xAxes: [
				{
					gridLines: {
						color: 'rgba(0, 0, 0, 0.1)'
					}
				}
			]
		},
		lineTension: 10,
		responsive: true,
		maintainAspectRatio: false
	};
	public lineChartColors: Array<any> = [
		
		{
			// grey
			backgroundColor: 'rgba(76,139,236,1)',
			borderColor: 'rgba(76,139,236,1)',
			pointBackgroundColor: 'rgba(76,139,236,1)',
			pointBorderColor: '#fff',

			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(76,139,236,1)'
		},
		{
			
			backgroundColor: '#06d79c',
			borderColor: '#06d79c',
			pointBackgroundColor: '#06d79c',
			pointBorderColor: '#fff',

			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: '#06d79c'
		},
		{
			// dark grey
			backgroundColor: 'rgba(234,237,242,1)',
			borderColor: 'rgba(234,237,242,1)',
			pointBackgroundColor: 'rgba(234,237,242,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(234,237,242,1)'
		}
	];
	public lineChartLegend = false;
	public lineChartType = 'line';

	// Doughnut
	public doughnutChartLabels: string[] = ['Confirmados', 'Sospechosos', 'Aislados', 'Recuperados', 'Hospitaizados', 'Fallecidos'];
	public doughnutChartOptions: any = {
		borderWidth: 2,
		maintainAspectRatio: false
	};
	public doughnutChartDataDiagnostico: number[] = [0, 0, 0, 0, 0, 0];
	public doughnutChartType = 'doughnut';
	public doughnutChartLegend = false;

	ngAfterViewInit() {}

	ngOnInit(){
		this._mainFacade.getHospitalSesion().subscribe(hospital=>{
			this.hospital = hospital;
			let input: ContadoresEstadisticaIn = {
				idHospital:hospital.idHospital._id,
				role: RolesUserEnum.PACIENTE,
				tipo: EstadisticaTipoEnum.COUNT_PACIENTES_POR_DIA_POR_DIAGNOSTICO
			}
			let input2: ContadoresEstadisticaIn = {
				idHospital:hospital.idHospital._id,
				role: RolesUserEnum.PACIENTE,
				tipo: EstadisticaTipoEnum.COUNT_PACIENTES_POR_DIAGNOSTICO
			}
			this._estadisticasFacade.distpachActionLoadEvolucionDiariaPacientes(input);
			this._estadisticasFacade.distpachActionLoadPacientesPorDiagnostico(input2);

			let inputTotalPacientes: ContadoresEstadisticaIn = {
				idHospital: hospital.idHospital._id,
				role: RolesUserEnum.PACIENTE,
				tipo: EstadisticaTipoEnum.COUNT_USER_POR_ROLE_AND_HOSPITAL
			}

			let inputTotalDoctores: ContadoresEstadisticaIn = {
				idHospital: hospital.idHospital._id,
				role: RolesUserEnum.DOCTOR,
				tipo: EstadisticaTipoEnum.COUNT_USER_POR_ROLE_AND_HOSPITAL
			} 

			this._estadisticasFacade.distpachActionLoadUsuariosPorRol(inputTotalPacientes);
			this._estadisticasFacade.distpachActionLoadUsuariosPorRol(inputTotalDoctores);
		})
		
		
		this._estadisticasFacade.getCountPacientesPorDiagnosticoDiarioFromStorage()
			.pipe(takeUntil(this._destroyed$))
			.subscribe(data=> {
				console.log(data);
				this.buildLineChartData(data)
		})

		this._estadisticasFacade.getCountPacientesPorDiagnosticoFromStorage()
			.pipe(takeUntil(this._destroyed$))
			.subscribe(data=>{
				let NConfirmados = data.find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.CONFIRMADO);
				let NSospechosos = data.find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.SOSPECHOSO);
				let NAislados = data.find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.AISLAMIENTO_PREVENTIVO);
				let NRecuperados = data.find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.RECUPERADO);
				let NHospitalizados = data.find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.HOSPITALIZADO);
				let NFallecidos = data.find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.FALLECIDO);
				this.doughnutChartDataDiagnostico = [ NConfirmados? NConfirmados.contador: 0, 
													  NSospechosos?NSospechosos.contador: 0,
													  NAislados?NAislados.contador: 0,
													  NRecuperados?NRecuperados.contador: 0,
													  NHospitalizados?NHospitalizados.contador: 0, 
													  NFallecidos?NFallecidos.contador: 0   
													]
		})
		this.isLoadingPacientesPorDiagnostico$ = this._estadisticasFacade.getIsloadingCountDiagnoticoFromStorage();
		this.isLoadingChartEvolucionDiariaPacietes$ = this._estadisticasFacade.getIsloadingCountDiagnoticoDiarioFromStorage();
		this.totalDoctores$ = this._estadisticasFacade.getTotalDoctoresFromStorage();
		this.totalPacientes$ = this._estadisticasFacade.getTotalPacientesFromStorage();
		this.isLoadingTotalDoctores$ = this._estadisticasFacade.getIsLoadingTotalDoctoresFromStorage();
		this.isLoadingTotalPacientes$ = this._estadisticasFacade.getIsLoadingTotalPacientesFromStorage();
		// this.isLoadingTotalPorRol = this._estadisticasFacade.getIs
		
	}
	
	transformDate(t){
		console.log(t);
		return new Date(new Date(t).getFullYear(), (new Date(t).getMonth()), new Date(t).getUTCDate())
	}
	buildLineChartData(data: CountPacientesPorDiaPorDiagnosticoOut []){ 
		this.dataDiaDiagnostico = [];
		this.lineChartLabelsDays = [];
		let seguimientosPorDia = _.chain(data)
			.map(item=>({...item, 
						agrupadoPor: { fecha_creacion:item.agrupadoPor.fecha_creacion,
							diagnostico_enum:item.agrupadoPor.diagnostico_enum,
							fecha_trasformada: this.transformDate(item.agrupadoPor.fecha_creacion).toLocaleDateString()
						}}))
			.orderBy(item=> item.agrupadoPor.fecha_creacion)
			.groupBy(item=>item.agrupadoPor.fecha_trasformada).value();

		console.log(seguimientosPorDia);
		let dias = []
		for (const dia in seguimientosPorDia) {    
			dias.push(dia);
			let sospechosos = seguimientosPorDia[dia].find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.SOSPECHOSO)
			let confirmados = seguimientosPorDia[dia].find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.CONFIRMADO)
			let aislados = seguimientosPorDia[dia].find(
			  	item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.AISLAMIENTO_PREVENTIVO)
			let contSosp: number = sospechosos?sospechosos.contador:0
			let contConf: number = confirmados?confirmados.contador:0
			let contAis: number = aislados?aislados.contador:0
			let objSospechos = {
				data: [contSosp, contConf, contAis],
				fecha: dia
			}  
			this.dataDiaDiagnostico.push(objSospechos)
		  }
		
		  let dataSospechosos = [];
		  let dataConfirmados = [];
		  let dataAislados = [];
		  this.dataDiaDiagnostico.forEach((item, index)=>{
			  console.log(index);
			if(index > 0){
			  dataSospechosos.push(item.data[0] + dataSospechosos[index-1])
			  dataConfirmados.push(item.data[1] + dataConfirmados[index-1])
			  dataAislados.push(item.data[2] + dataAislados[index-1])
			}else{
				dataSospechosos.push(item.data[0])
				dataConfirmados.push(item.data[1])
				dataAislados.push(item.data[2])
			}
		  })
	
		  this.lineChartDataPacientes[0].data = dataConfirmados;
		  this.lineChartDataPacientes[1].data = dataSospechosos;
		//   this.lineChartDataPacientes[2].data = dataAislados;
		  this.lineChartLabelsDays = dias; 

	  }
	
	calcularPorcentaje(valor, total): number{
		if(valor<1)
			return 0
		return (valor*100)/total
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
