import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInterviewResultsComponent } from './hr-interview-results.component';

describe('HrInterviewResultsComponent', () => {
  let component: HrInterviewResultsComponent;
  let fixture: ComponentFixture<HrInterviewResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInterviewResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
