import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMp4Component } from './question-mp4.component';

describe('QuestionMp4Component', () => {
  let component: QuestionMp4Component;
  let fixture: ComponentFixture<QuestionMp4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMp4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMp4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
