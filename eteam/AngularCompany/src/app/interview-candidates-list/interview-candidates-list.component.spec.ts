import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCandidatesListComponent } from './interview-candidates-list.component';

describe('InterviewCandidatesListComponent', () => {
  let component: InterviewCandidatesListComponent;
  let fixture: ComponentFixture<InterviewCandidatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewCandidatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewCandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
