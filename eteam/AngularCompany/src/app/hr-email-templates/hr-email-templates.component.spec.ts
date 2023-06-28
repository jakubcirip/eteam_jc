import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmailTemplatesComponent } from './hr-email-templates.component';

describe('HrEmailTemplatesComponent', () => {
  let component: HrEmailTemplatesComponent;
  let fixture: ComponentFixture<HrEmailTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEmailTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEmailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
