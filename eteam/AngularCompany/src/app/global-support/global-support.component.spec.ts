import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSupportComponent } from './global-support.component';

describe('GlobalSupportComponent', () => {
  let component: GlobalSupportComponent;
  let fixture: ComponentFixture<GlobalSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
