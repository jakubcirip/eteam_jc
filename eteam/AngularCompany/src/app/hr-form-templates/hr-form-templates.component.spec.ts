import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFormTemplatesComponent } from './hr-form-templates.component';

describe('HrFormTemplatesComponent', () => {
  let component: HrFormTemplatesComponent;
  let fixture: ComponentFixture<HrFormTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFormTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFormTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
