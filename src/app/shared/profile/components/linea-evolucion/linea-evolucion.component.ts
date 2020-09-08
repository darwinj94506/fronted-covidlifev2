import { Component, OnInit, Input } from '@angular/core';
import { SeguimientoCompletoPacienteOut } from '../../../../core/domain/outputs';
import { SeguimientoCompletoPacienteIn } from '../../../../core/domain/inputs';
import { Observable } from 'rxjs';
import { SeguimientoFacade } from '../../../../store/facade';
import _ from 'lodash';

interface ItemChart {
	data: Array<number>,
	label: String 
}
@Component({
  selector: 'app-linea-evolucion',
  templateUrl: './linea-evolucion.component.html',
  styleUrls: ['./linea-evolucion.component.css']
})

export class LineaEvolucionComponent implements OnInit {
  

  @Input() idPaciente: String;
  seguimientos$ : Observable<SeguimientoCompletoPacienteOut[]>;
  isLoading$: Observable<boolean>;
  public dataDiaDiagnostico: Array<any> = [];


	public lineChartDataPacientes : Array<ItemChart> = [
		{ data: [], label: 'Temperatura' },
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


  constructor(private _seguimientoFacade: SeguimientoFacade) { }

  ngOnInit(): void {
    this.isLoading$ = this._seguimientoFacade.getIsLoadingSeguimientosCompletosFromStore();
    this.loadSeguimientosCompletos(this.idPaciente);
    this._seguimientoFacade.getSeguimientosCompletosFromStore()
      .subscribe(data=>{
        this.buildData(data)
        // console.log(data);
      })
      
  }

  loadSeguimientosCompletos(idPaciente:String){
    let params: SeguimientoCompletoPacienteIn = { idPaciente }
    this._seguimientoFacade.dispatchActionLoadSeguimientosCompletos(params);
  }

  transformDate(t){
    let today = new Date(t);
    return new Date(
      today.getFullYear(), today.getMonth(), today.getUTCDate(),
      today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds())
  }

  buildData(data:SeguimientoCompletoPacienteOut[]){
 
    let dias= [];
    let temp= [];
    let seg = []; 
   
    data.forEach(i=>{
      seg = [...seg, ...i.seguimientos]
    })

    let dataOrdenada  = _.chain(seg)
      .map(item=>({...item, 
              createAt: this.transformDate(item.createAt) }))
      .orderBy(item=> item.createAt).value();
      
      dataOrdenada.forEach(i=>{
        dias.push(i.createAt.toLocaleDateString())
        temp.push(i.temperatura);
      })
    this.lineChartLabelsDays = dias; 
    this.lineChartDataPacientes[0].data = temp
  }
  
}




// buildData(data:SeguimientoCompletoPacienteOut[]){
//   console.log(data);
//   let dataOrdenada  = _.chain(data)
//     .map(item=>({...item, 
//             _id: this.transformDate(item._id)
//           }))
//     .orderBy(item=> item._id).value();
//   let dias= [];
//   let temp= [];
//   let fusion = []; 
//   dataOrdenada.forEach(i=>{
//     dias.push(i._id.toLocaleDateString());
//       i.seguimientos.forEach(i=>{
//         temp = [...temp, i.temperatura]
//       })
//   })

//   this.lineChartLabelsDays = dias; 
//   this.lineChartDataPacientes[0].data = temp
// }