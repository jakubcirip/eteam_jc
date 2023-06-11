import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrForgotComponent } from './hr-forgot.component';

describe('HrForgotComponent', () => {
  let component: HrForgotComponent;
  let fixture: ComponentFixture<HrForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrForgotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
