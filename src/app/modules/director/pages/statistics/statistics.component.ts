import { Component, AfterViewInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

declare var require: any;

// const data: any = require('./data.json');


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})


export class StatisticsComponent implements AfterViewInit {
	
	subtitle: string;
	constructor() {
		this.subtitle = 'This is some text within a card block.';
	}
	// This is for the dashboar line chart
	// lineChart
	public lineChartData: Array<any> = [
		{ data: [0, 50, 30, 60, 180, 120, 180, 80], label: 'Confirmados ' },
		{ data: [0, 100, 70, 100, 240, 180, 220, 140], label: 'Sospechosos ' },
		{ data: [0, 150, 110, 240, 200, 200, 300, 200], label: 'Recuperados ' }
	];

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
	public doughnutChartLabels: string[] = ['Confirmados', 'Sospechosos', 'Recuperados', 'Fallecidos'];
	public doughnutChartOptions: any = {
		borderWidth: 2,
		maintainAspectRatio: false
	};
	public doughnutChartData: number[] = [150, 450, 200, 20];
	public doughnutChartType = 'doughnut';
	public doughnutChartLegend = false;

	ngAfterViewInit() {}
}
