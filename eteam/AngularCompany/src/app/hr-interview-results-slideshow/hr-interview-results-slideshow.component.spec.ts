import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInterviewResultsSlideshowComponent } from './hr-interview-results-slideshow.component';

describe('HrInterviewResultsSlideshowComponent', () => {
  let component: HrInterviewResultsSlideshowComponent;
  let fixture: ComponentFixture<HrInterviewResultsSlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInterviewResultsSlideshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewResultsSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
