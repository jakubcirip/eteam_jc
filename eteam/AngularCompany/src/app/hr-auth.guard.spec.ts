import { TestBed, async, inject } from '@angular/core/testing';

import { HrAuthGuard } from './hr-auth.guard';

describe('HrAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrAuthGuard]
    });
  });

  it('should ...', inject([HrAuthGuard], (guard: HrAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
