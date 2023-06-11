import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFaqComponent } from './company-faq.component';

describe('CompanyFaqComponent', () => {
  let component: CompanyFaqComponent;
  let fixture: ComponentFixture<CompanyFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
