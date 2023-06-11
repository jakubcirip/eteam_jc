import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSuccComponent } from './registration-succ.component';

describe('RegistrationSuccComponent', () => {
  let component: RegistrationSuccComponent;
  let fixture: ComponentFixture<RegistrationSuccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationSuccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSuccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
