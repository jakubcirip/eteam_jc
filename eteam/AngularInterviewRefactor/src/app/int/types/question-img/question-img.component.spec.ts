import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionImgComponent } from './question-img.component';

describe('QuestionImgComponent', () => {
  let component: QuestionImgComponent;
  let fixture: ComponentFixture<QuestionImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
