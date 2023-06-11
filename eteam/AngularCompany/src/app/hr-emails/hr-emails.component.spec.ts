import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmailsComponent } from './hr-emails.component';

describe('HrEmailsComponent', () => {
  let component: HrEmailsComponent;
  let fixture: ComponentFixture<HrEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
