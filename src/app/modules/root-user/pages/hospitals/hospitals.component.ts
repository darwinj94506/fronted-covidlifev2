import { Component, OnInit } from '@angular/core';
import { ProvinceService } from '../../services'; 
@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  constructor( private _province: ProvinceService ) { }

  ngOnInit(): void {
    this._province.getProvinces().subscribe(console.log)
  }

}
