import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { EstadisticasFacade } from '../../store/estadisticas.facade';
import { MainFacade } from '../../../../store/facade';
import { ContadoresEstadisticaIn } from '../../../../core/domain/inputs';
import { ContadoresEstadisticaOut, CountPacientesPorDiaPorDiagnosticoOut } from '../../../../core/domain/outputs';
import { EstadisticaTipoEnum, RolesUserEnum, DiagnosticoActualEnum } from '../../../../core/domain/enums';
import { Observable, Subscription } from 'rxjs';
// import {  } from 'rxjs/operators';
import * as _ from "lodash";

declare var require: any;
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
	suscriptionEvolucionDiaria: Subscription;
	suscriptionPacientesPorDiagnostico:Subscription;

	contadoresEstadisticas$: Observable<ContadoresEstadisticaOut>;
	isLoadingChartEvolucionDiariaPacietes$:Observable<boolean>;
	isLoadingPacientesPorDiagnostico$:Observable<boolean>;
	totalDoctores$: Observable <number>;
	totalPacientes$: Observable <number>;
	subtitle: string;
	constructor( private _estadisticasFacade: EstadisticasFacade,
				 private _mainFacade: MainFacade) {
		this.subtitle = 'This is some text within a card block.';
	}
	// This is for the dashboar line chart
	// lineChart
	// public lineChartData: Array<any> = [
	// 	{ data: [0, 50, 30, 60, 180, 120, 180, 80], label: 'Confirmados' },
	// 	{ data: [0, 100, 70, 100, 240, 180, 220, 140], label: 'Sospechosos' },
	// 	{ data: [0, 150, 110, 240, 200, 200, 300, 200], label: 'Aislados' },
	// 	{ data: [0, 150, 110, 240, 200, 200, 300, 200], label: 'Fallecidos' }
	// ];

	public dataDiaDiagnostico: Array<any> = [];


	public lineChartDataPacientes : Array<ItemChart> = [
		{ data: [], label: 'Confirmados' },
		{ data: [], label: 'Sospechosos' },
		{ data: [], label: 'Aislados' },
	];
	public lineChartLabelsDays : Array<String>;

	public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'];
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
			// grey
			backgroundColor: 'rgba(117,91,241,1)',
			borderColor: 'rgba(117,91,241,1)',
			pointBackgroundColor: 'rgba(117,91,241,1)',
			pointBorderColor: '#fff',

			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(117,91,241,1)'
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
	public doughnutChartLabels: string[] = ['Confirmados', 'Sospechosos', 'Aislados'];
	public doughnutChartOptions: any = {
		borderWidth: 2,
		maintainAspectRatio: false
	};
	public doughnutChartDataDiagnostico: number[] = [];
	public doughnutChartData: number[] = [150, 450, 200];
	public doughnutChartType = 'doughnut';
	public doughnutChartLegend = false;

	ngAfterViewInit() {}

	ngOnInit(){
		this._mainFacade.getHospitalSesion().subscribe(hospital=>{
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
		
		
		this.suscriptionEvolucionDiaria = this._estadisticasFacade.getCountPacientesPorDiagnosticoDiarioFromStorage()
			.subscribe(data=> {
				console.log(data);
				this.buildLineChartData(data)
	
		})

		this.suscriptionPacientesPorDiagnostico = this._estadisticasFacade.getCountPacientesPorDiagnosticoFromStorage()
			.subscribe(data=>{
				let NConfirmados = data.find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.CONFIRMADO);
				let NSospechosos = data.find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.SOSPECHOSO);
				let NAislados = data.find(item=>item.agrupadoPor.diagnostico_enum === DiagnosticoActualEnum.AISLAMIENTO_PREVENTIVO);
				this.doughnutChartDataDiagnostico = [ NConfirmados? NConfirmados.contador: 0, 
													  NSospechosos?NSospechosos.contador: 0,
													  NAislados?NAislados.contador: 0 ]
		})
		this.isLoadingPacientesPorDiagnostico$ = this._estadisticasFacade.getIsloadingCountDiagnoticoFromStorage();
		this.isLoadingChartEvolucionDiariaPacietes$ = this._estadisticasFacade.getIsloadingCountDiagnoticoDiarioFromStorage();
		this.totalDoctores$ = this._estadisticasFacade.getTotalDoctoresFromStorage();
		this.totalPacientes$ = this._estadisticasFacade.getTotalPacientesFromStorage()
	}
	
	transformDate(t){
		return new Date(new Date(t).getFullYear(), (new Date(t).getMonth()), new Date(t).getUTCDate())
	}
	buildLineChartData(data: CountPacientesPorDiaPorDiagnosticoOut []){   
		let seguimientosPorDia = _.chain(data)
			.map(item=>({...item, 
						agrupadoPor: { fecha_creacion:item.agrupadoPor.fecha_creacion,
							diagnostico_enum:item.agrupadoPor.diagnostico_enum,
							fecha_trasformada: this.transformDate(item.agrupadoPor.fecha_creacion).toLocaleDateString()
						}}))
			.orderBy(item=> item.agrupadoPor.fecha_creacion)
			.groupBy(item=>item.agrupadoPor.fecha_trasformada).value();
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
	
		  this.lineChartDataPacientes[0].data = dataSospechosos;
		  this.lineChartDataPacientes[1].data = dataConfirmados;
		  this.lineChartDataPacientes[2].data = dataAislados;
		  this.lineChartLabelsDays = dias; 

	  }
	ngOnDestroy(){
		this.suscriptionEvolucionDiaria.unsubscribe();
		this.suscriptionPacientesPorDiagnostico.unsubscribe();
	}


}
