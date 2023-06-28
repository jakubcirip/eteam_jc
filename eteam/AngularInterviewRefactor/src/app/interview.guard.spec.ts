import { TestBed } from '@angular/core/testing';

import { InterviewGuard } from './interview.guard';

describe('InterviewGuard', () => {
  let guard: InterviewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InterviewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
