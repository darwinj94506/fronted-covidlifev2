import { Component, OnInit } from '@angular/core';
import { HospitalFacade } from '../../store/facades';
import { Observable } from 'rxjs';
import { IHospitalEntity } from '../../../../core/domain/entities/hospital.entity';
@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {
  hospitales$: IHospitalEntity []= [];

  constructor(private _hospitalFacade: HospitalFacade) { }

  ngOnInit(): void {

  }

}
