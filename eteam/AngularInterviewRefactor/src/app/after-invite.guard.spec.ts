import { TestBed } from '@angular/core/testing';

import { AfterInviteGuard } from './after-invite.guard';

describe('AfterInviteGuard', () => {
  let guard: AfterInviteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AfterInviteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
