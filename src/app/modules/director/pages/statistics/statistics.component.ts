import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { EstadisticasFacade } from '../../store/estadisticas.facade';
import { MainFacade } from '../../../../store/facade';
import { ContadoresEstadisticaIn } from '../../../../core/domain/inputs';
import { ContadoresEstadisticaOut, CountPacientesPorDiaPorDiagnosticoOut } from '../../../../core/domain/outputs';
import { EstadisticaTipoEnum, RolesUserEnum, DiagnosticoActualEnum } from '../../../../core/domain/enums';
import { Observable } from 'rxjs';
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

export class StatisticsComponent implements AfterViewInit, OnInit {
	contadoresEstadisticas$: Observable<ContadoresEstadisticaOut>;
	subtitle: string;
	constructor( private _estadisticasFacade: EstadisticasFacade,
				 private _mainFacade: MainFacade) {
		this.subtitle = 'This is some text within a card block.';
	}
	// This is for the dashboar line chart
	// lineChart
	public lineChartData: Array<any> = [
		{ data: [0, 50, 30, 60, 180, 120, 180, 80], label: 'Confirmados' },
		{ data: [0, 100, 70, 100, 240, 180, 220, 140], label: 'Sospechosos' },
		{ data: [0, 150, 110, 240, 200, 200, 300, 200], label: 'Aislados' },
		// { data: [0, 150, 110, 240, 200, 200, 300, 200], label: 'Fallecidos' }
	];

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
			// dark grey
			backgroundColor: 'rgba(234,237,242,1)',
			borderColor: 'rgba(234,237,242,1)',
			pointBackgroundColor: 'rgba(234,237,242,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(234,237,242,1)'
		},
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
	public doughnutChartData: number[] = [150, 450, 200, 20];
	public doughnutChartType = 'doughnut';
	public doughnutChartLegend = false;

	ngAfterViewInit() {}

	ngOnInit(){
		this._mainFacade.getHospitalSesion().subscribe(hospital=>{
			let input: ContadoresEstadisticaIn = {
				idHospital:hospital.idHospital._id,
				role: RolesUserEnum.PACIENTE,
				tipo: EstadisticaTipoEnum.COUNT_PACIENTES_POR_DIAGNOSTICO
			}
			this._estadisticasFacade.distpachActionLoadTotalesPacientes(input)
		})
		
		this._estadisticasFacade.getTotalEstadisticasFromStorage()
			.subscribe(data=> {
				this.buildLineChartData(data.countPacientesPorDiaPorDiagnosticoOut)
		})
	}

	buildLineChartData(data: CountPacientesPorDiaPorDiagnosticoOut []){

		let confirmados =_.chain(data).filter(item=> 
					item._id.diagnostico_enum && item._id.diagnostico_enum === DiagnosticoActualEnum.CONFIRMADO)
					.orderBy(data=> data._id.fecha_creacion).value();
		let sospechosos =_.chain(data).filter(item=> 
			item._id.diagnostico_enum && item._id.diagnostico_enum === DiagnosticoActualEnum.SOSPECHOSO)
			.orderBy(data=> data._id.fecha_creacion).value();
		let aislados = _.chain(data).filter( item=> 
			item._id.diagnostico_enum && item._id.diagnostico_enum === DiagnosticoActualEnum.AISLAMIENTO_PREVENTIVO)
			.orderBy(data=> data._id.fecha_creacion).value();
				
		confirmados.forEach((item, index)=> {
			if(index > 0)
				this.lineChartDataPacientes[0].data.push(this.lineChartDataPacientes[0].data[index-1] + item.contador)
			else 
				this.lineChartDataPacientes[0].data.push(item.contador)
		})

		sospechosos.forEach((item, index)=> {
			if(index > 0)
				this.lineChartDataPacientes[1].data.push(this.lineChartDataPacientes[1].data[index-1] + item.contador)
			else 
				this.lineChartDataPacientes[1].data.push(item.contador)
		})

		aislados.forEach((item, index)=> {
			if(index > 0)
				this.lineChartDataPacientes[2].data.push(this.lineChartDataPacientes[2].data[index-1] + item.contador)
			else 
				this.lineChartDataPacientes[2].data.push(item.contador)
		})

		let seguimientosPorDia = _.chain(data)
							.orderBy(item=> item._id.fecha_creacion)
							.groupBy(item=>item._id.fecha_creacion).value();
		console.log(seguimientosPorDia);
		for (const dia in seguimientosPorDia) {
			this.lineChartDataPacientes[0].data.push(this.lineChartDataPacientes[0].data[0])
			// seguimientosPorDia[dia].includes()
        }

	}


}
