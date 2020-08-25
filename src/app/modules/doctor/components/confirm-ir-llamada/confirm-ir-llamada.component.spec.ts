import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmIrLlamadaComponent } from './confirm-ir-llamada.component';

describe('ConfirmIrLlamadaComponent', () => {
  let component: ConfirmIrLlamadaComponent;
  let fixture: ComponentFixture<ConfirmIrLlamadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmIrLlamadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmIrLlamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
