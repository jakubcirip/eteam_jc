import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFmMp4Component } from './hr-fm-mp4.component';

describe('HrFmMp4Component', () => {
  let component: HrFmMp4Component;
  let fixture: ComponentFixture<HrFmMp4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFmMp4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFmMp4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
