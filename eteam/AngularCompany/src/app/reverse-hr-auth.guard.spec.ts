import { TestBed, async, inject } from '@angular/core/testing';

import { ReverseHrAuthGuard } from './reverse-hr-auth.guard';

describe('ReverseHrAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReverseHrAuthGuard]
    });
  });

  it('should ...', inject([ReverseHrAuthGuard], (guard: ReverseHrAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
