import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAppLeftComponent } from './auth-app-left.component';

describe('AuthAppLeftComponent', () => {
  let component: AuthAppLeftComponent;
  let fixture: ComponentFixture<AuthAppLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthAppLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAppLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
