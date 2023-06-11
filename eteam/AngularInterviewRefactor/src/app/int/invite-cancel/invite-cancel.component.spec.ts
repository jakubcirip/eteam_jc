import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCancelComponent } from './invite-cancel.component';

describe('InviteCancelComponent', () => {
  let component: InviteCancelComponent;
  let fixture: ComponentFixture<InviteCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
