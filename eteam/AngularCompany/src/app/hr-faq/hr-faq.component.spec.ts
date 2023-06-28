import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFaqComponent } from './hr-faq.component';

describe('HrFaqComponent', () => {
  let component: HrFaqComponent;
  let fixture: ComponentFixture<HrFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
