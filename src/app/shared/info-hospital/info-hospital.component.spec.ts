import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHospitalComponent } from './info-hospital.component';

describe('InfoHospitalComponent', () => {
  let component: InfoHospitalComponent;
  let fixture: ComponentFixture<InfoHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
