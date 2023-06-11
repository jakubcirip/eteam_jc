import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAccountTypeComponent } from './company-account-type.component';

describe('CompanyAccountTypeComponent', () => {
  let component: CompanyAccountTypeComponent;
  let fixture: ComponentFixture<CompanyAccountTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAccountTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
