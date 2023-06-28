import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastInterviewComponent } from './fast-interview.component';

describe('FastInterviewComponent', () => {
  let component: FastInterviewComponent;
  let fixture: ComponentFixture<FastInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
