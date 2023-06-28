import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewErrorComponent } from './interview-error.component';

describe('InterviewErrorComponent', () => {
  let component: InterviewErrorComponent;
  let fixture: ComponentFixture<InterviewErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
