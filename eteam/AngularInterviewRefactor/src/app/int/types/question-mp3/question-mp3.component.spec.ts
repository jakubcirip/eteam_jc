import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMp3Component } from './question-mp3.component';

describe('QuestionMp3Component', () => {
  let component: QuestionMp3Component;
  let fixture: ComponentFixture<QuestionMp3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMp3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMp3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
