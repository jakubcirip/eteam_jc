import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInterviewPeopleComponent } from './hr-interview-people.component';

describe('HrInterviewPeopleComponent', () => {
  let component: HrInterviewPeopleComponent;
  let fixture: ComponentFixture<HrInterviewPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInterviewPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
