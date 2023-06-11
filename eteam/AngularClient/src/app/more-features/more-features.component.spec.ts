import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreFeaturesComponent } from './more-features.component';

describe('MoreFeaturesComponent', () => {
  let component: MoreFeaturesComponent;
  let fixture: ComponentFixture<MoreFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
