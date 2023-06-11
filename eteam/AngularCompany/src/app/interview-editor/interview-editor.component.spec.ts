import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewEditorComponent } from './interview-editor.component';

describe('InterviewEditorComponent', () => {
  let component: InterviewEditorComponent;
  let fixture: ComponentFixture<InterviewEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
