import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSelectOneComponent } from './answer-select-one.component';

describe('AnswerSelectOneComponent', () => {
  let component: AnswerSelectOneComponent;
  let fixture: ComponentFixture<AnswerSelectOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerSelectOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerSelectOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
