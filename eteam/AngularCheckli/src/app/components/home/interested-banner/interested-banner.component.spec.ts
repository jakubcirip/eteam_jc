import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedBannerComponent } from './interested-banner.component';

describe('InterestedBannerComponent', () => {
  let component: InterestedBannerComponent;
  let fixture: ComponentFixture<InterestedBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestedBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
