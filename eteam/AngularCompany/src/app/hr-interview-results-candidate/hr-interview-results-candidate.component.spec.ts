import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInterviewResultsCandidateComponent } from './hr-interview-results-candidate.component';

describe('HrInterviewResultsCandidateComponent', () => {
  let component: HrInterviewResultsCandidateComponent;
  let fixture: ComponentFixture<HrInterviewResultsCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInterviewResultsCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewResultsCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
