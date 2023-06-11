import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrJobPositionsComponent } from './hr-job-positions.component';

describe('HrJobPositionsComponent', () => {
  let component: HrJobPositionsComponent;
  let fixture: ComponentFixture<HrJobPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrJobPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrJobPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
