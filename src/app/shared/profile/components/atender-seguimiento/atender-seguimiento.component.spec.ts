import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtenderSeguimientoComponent } from './atender-seguimiento.component';

describe('AtenderSeguimientoComponent', () => {
  let component: AtenderSeguimientoComponent;
  let fixture: ComponentFixture<AtenderSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtenderSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtenderSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
