import { TestBed, async, inject } from '@angular/core/testing';

import { LangGuard } from './lang.guard';

describe('LangGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LangGuard]
    });
  });

  it('should ...', inject([LangGuard], (guard: LangGuard) => {
    expect(guard).toBeTruthy();
  }));
});
