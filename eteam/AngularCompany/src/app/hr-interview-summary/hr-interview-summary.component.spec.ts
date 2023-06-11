import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInterviewSummaryComponent } from './hr-interview-summary.component';

describe('HrInterviewSummaryComponent', () => {
  let component: HrInterviewSummaryComponent;
  let fixture: ComponentFixture<HrInterviewSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInterviewSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
