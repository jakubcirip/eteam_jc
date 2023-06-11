import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTokensComponent } from './company-tokens.component';

describe('CompanyTokensComponent', () => {
  let component: CompanyTokensComponent;
  let fixture: ComponentFixture<CompanyTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
