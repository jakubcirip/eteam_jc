import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRegistrationSuccessComponent } from './hr-registration-success.component';

describe('HrRegistrationSuccessComponent', () => {
  let component: HrRegistrationSuccessComponent;
  let fixture: ComponentFixture<HrRegistrationSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrRegistrationSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRegistrationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
