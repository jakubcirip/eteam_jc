import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEmailsEditorComponent } from './hr-emails-editor.component';

describe('HrEmailsEditorComponent', () => {
  let component: HrEmailsEditorComponent;
  let fixture: ComponentFixture<HrEmailsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEmailsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEmailsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
