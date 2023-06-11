import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrJobPositionFormEditorComponent } from './hr-job-position-form-editor.component';

describe('HrJobPositionFormEditorComponent', () => {
  let component: HrJobPositionFormEditorComponent;
  let fixture: ComponentFixture<HrJobPositionFormEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrJobPositionFormEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrJobPositionFormEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
