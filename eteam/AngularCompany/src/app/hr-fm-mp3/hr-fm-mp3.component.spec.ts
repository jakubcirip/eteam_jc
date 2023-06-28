import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFmMp3Component } from './hr-fm-mp3.component';

describe('HrFmMp3Component', () => {
  let component: HrFmMp3Component;
  let fixture: ComponentFixture<HrFmMp3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HrFmMp3Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFmMp3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
