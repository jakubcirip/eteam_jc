import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrForgotPasswordFinishComponent } from './hr-forgot-password-finish.component';

describe('HrForgotPasswordFinishComponent', () => {
  let component: HrForgotPasswordFinishComponent;
  let fixture: ComponentFixture<HrForgotPasswordFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrForgotPasswordFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrForgotPasswordFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
