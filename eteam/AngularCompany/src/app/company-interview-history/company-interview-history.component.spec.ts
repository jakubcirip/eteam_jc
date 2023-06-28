import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInterviewHistoryComponent } from './company-interview-history.component';

describe('CompanyInterviewHistoryComponent', () => {
  let component: CompanyInterviewHistoryComponent;
  let fixture: ComponentFixture<CompanyInterviewHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInterviewHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInterviewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
