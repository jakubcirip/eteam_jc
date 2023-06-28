import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInterviewCandidatsComponent } from './hr-interview-candidats.component';

describe('HrInterviewCandidatsComponent', () => {
  let component: HrInterviewCandidatsComponent;
  let fixture: ComponentFixture<HrInterviewCandidatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInterviewCandidatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
