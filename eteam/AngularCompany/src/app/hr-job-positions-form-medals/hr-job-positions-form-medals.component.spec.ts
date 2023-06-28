import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrJobPositionsFormMedalsComponent } from './hr-job-positions-form-medals.component';

describe('HrJobPositionsFormMedalsComponent', () => {
  let component: HrJobPositionsFormMedalsComponent;
  let fixture: ComponentFixture<HrJobPositionsFormMedalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrJobPositionsFormMedalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrJobPositionsFormMedalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
