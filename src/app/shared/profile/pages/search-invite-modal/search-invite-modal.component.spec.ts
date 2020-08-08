import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInviteModalComponent } from './search-invite-modal.component';

describe('SearchInviteModalComponent', () => {
  let component: SearchInviteModalComponent;
  let fixture: ComponentFixture<SearchInviteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInviteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInviteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
