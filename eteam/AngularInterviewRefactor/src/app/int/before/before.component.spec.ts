import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeComponent } from './before.component';

describe('BeforeComponent', () => {
  let component: BeforeComponent;
  let fixture: ComponentFixture<BeforeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
