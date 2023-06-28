import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingNewComponent } from './pricing-new.component';

describe('PricingNewComponent', () => {
  let component: PricingNewComponent;
  let fixture: ComponentFixture<PricingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
