import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedListComponent } from './trusted-list.component';

describe('TrustedListComponent', () => {
  let component: TrustedListComponent;
  let fixture: ComponentFixture<TrustedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
