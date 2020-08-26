import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPacienteModalComponent } from './datos-paciente-modal.component';

describe('DatosPacienteModalComponent', () => {
  let component: DatosPacienteModalComponent;
  let fixture: ComponentFixture<DatosPacienteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPacienteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPacienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
