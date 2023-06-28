import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInterviewResultsCompareComponent } from './hr-interview-results-compare.component';

describe('HrInterviewResultsCompareComponent', () => {
  let component: HrInterviewResultsCompareComponent;
  let fixture: ComponentFixture<HrInterviewResultsCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInterviewResultsCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewResultsCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
