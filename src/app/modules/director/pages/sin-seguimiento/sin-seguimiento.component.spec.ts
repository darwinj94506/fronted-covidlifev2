import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinSeguimientoComponent } from './sin-seguimiento.component';

describe('SinSeguimientoComponent', () => {
  let component: SinSeguimientoComponent;
  let fixture: ComponentFixture<SinSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
