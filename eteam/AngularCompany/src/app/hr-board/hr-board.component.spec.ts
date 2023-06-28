import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrBoardComponent } from './hr-board.component';

describe('HrBoardComponent', () => {
  let component: HrBoardComponent;
  let fixture: ComponentFixture<HrBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
