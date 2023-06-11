import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSelectManyComponent } from './answer-select-many.component';

describe('AnswerSelectManyComponent', () => {
  let component: AnswerSelectManyComponent;
  let fixture: ComponentFixture<AnswerSelectManyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerSelectManyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerSelectManyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
