import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInterviewSlideshowFinishComponent } from './hr-interview-slideshow-finish.component';

describe('HrInterviewSlideshowFinishComponent', () => {
  let component: HrInterviewSlideshowFinishComponent;
  let fixture: ComponentFixture<HrInterviewSlideshowFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrInterviewSlideshowFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewSlideshowFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
