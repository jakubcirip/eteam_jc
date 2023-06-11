import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrJobPositionsFormComponent } from './hr-job-positions-form.component';

describe('HrJobPositionsFormComponent', () => {
  let component: HrJobPositionsFormComponent;
  let fixture: ComponentFixture<HrJobPositionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrJobPositionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrJobPositionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
