import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrNonstopInterviewComponent } from './hr-nonstop-interview.component';

describe('HrNonstopInterviewComponent', () => {
  let component: HrNonstopInterviewComponent;
  let fixture: ComponentFixture<HrNonstopInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrNonstopInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrNonstopInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
