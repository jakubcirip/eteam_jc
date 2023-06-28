import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareTestComponent } from './hardware-test.component';

describe('HardwareTestComponent', () => {
  let component: HardwareTestComponent;
  let fixture: ComponentFixture<HardwareTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
