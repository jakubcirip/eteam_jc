import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDivisionComponent } from './company-division.component';

describe('CompanyDivisionComponent', () => {
  let component: CompanyDivisionComponent;
  let fixture: ComponentFixture<CompanyDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
