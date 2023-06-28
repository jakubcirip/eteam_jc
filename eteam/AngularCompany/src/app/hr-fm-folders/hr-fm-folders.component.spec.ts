import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFmFoldersComponent } from './hr-fm-folders.component';

describe('HrFmFoldersComponent', () => {
  let component: HrFmFoldersComponent;
  let fixture: ComponentFixture<HrFmFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFmFoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFmFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
