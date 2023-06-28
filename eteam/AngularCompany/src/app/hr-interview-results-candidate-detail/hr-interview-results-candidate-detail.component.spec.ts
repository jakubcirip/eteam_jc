import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInterviewResultsCandidateDetailComponent } from './hr-interview-results-candidate-detail.component';

describe('HrInterviewResultsCandidateDetailComponent', () => {
  let component: HrInterviewResultsCandidateDetailComponent;
  let fixture: ComponentFixture<HrInterviewResultsCandidateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInterviewResultsCandidateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewResultsCandidateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
