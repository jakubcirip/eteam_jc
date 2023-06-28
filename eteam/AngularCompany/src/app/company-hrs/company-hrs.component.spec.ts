import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHrsComponent } from './company-hrs.component';

describe('CompanyHrsComponent', () => {
  let component: CompanyHrsComponent;
  let fixture: ComponentFixture<CompanyHrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyHrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyHrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
