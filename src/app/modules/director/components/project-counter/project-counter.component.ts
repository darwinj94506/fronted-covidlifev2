import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
// import { ContadoresEstadisticaOut } from '../../../../core/domain/outputs';
@Component({
  selector: 'app-project-counter',
  templateUrl: './project-counter.component.html'
})

export class ProjectCounterComponent {
  @Input() totalPacientes$: Observable<number>;
  @Input() totalDoctores$: Observable<number>;
  constructor() {}
}
