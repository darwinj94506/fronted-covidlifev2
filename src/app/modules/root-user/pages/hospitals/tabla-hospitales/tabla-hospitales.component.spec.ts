import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHospitalesComponent } from './tabla-hospitales.component';

describe('TablaHospitalesComponent', () => {
  let component: TablaHospitalesComponent;
  let fixture: ComponentFixture<TablaHospitalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaHospitalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaHospitalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
