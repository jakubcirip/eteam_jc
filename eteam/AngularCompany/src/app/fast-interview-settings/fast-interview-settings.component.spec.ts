import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastInterviewSettingsComponent } from './fast-interview-settings.component';

describe('FastInterviewSettingsComponent', () => {
  let component: FastInterviewSettingsComponent;
  let fixture: ComponentFixture<FastInterviewSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastInterviewSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastInterviewSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
