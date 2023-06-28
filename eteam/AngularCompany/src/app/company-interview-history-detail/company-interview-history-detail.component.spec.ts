import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInterviewHistoryDetailComponent } from './company-interview-history-detail.component';

describe('CompanyInterviewHistoryDetailComponent', () => {
  let component: CompanyInterviewHistoryDetailComponent;
  let fixture: ComponentFixture<CompanyInterviewHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInterviewHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInterviewHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
