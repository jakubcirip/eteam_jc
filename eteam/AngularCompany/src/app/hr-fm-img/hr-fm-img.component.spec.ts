import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFmImgComponent } from './hr-fm-img.component';

describe('HrFmImgComponent', () => {
  let component: HrFmImgComponent;
  let fixture: ComponentFixture<HrFmImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFmImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFmImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
