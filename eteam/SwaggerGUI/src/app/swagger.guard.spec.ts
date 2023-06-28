import { TestBed, async, inject } from '@angular/core/testing';

import { SwaggerGuard } from './swagger.guard';

describe('SwaggerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwaggerGuard]
    });
  });

  it('should ...', inject([SwaggerGuard], (guard: SwaggerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
