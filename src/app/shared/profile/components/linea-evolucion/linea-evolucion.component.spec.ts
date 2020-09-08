import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaEvolucionComponent } from './linea-evolucion.component';

describe('LineaEvolucionComponent', () => {
  let component: LineaEvolucionComponent;
  let fixture: ComponentFixture<LineaEvolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaEvolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaEvolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
