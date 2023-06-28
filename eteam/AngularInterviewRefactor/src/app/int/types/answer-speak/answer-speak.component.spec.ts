import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSpeakComponent } from './answer-speak.component';

describe('AnswerSpeakComponent', () => {
  let component: AnswerSpeakComponent;
  let fixture: ComponentFixture<AnswerSpeakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerSpeakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerSpeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
