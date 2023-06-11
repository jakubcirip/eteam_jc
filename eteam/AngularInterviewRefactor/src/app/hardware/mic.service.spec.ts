import { TestBed } from '@angular/core/testing';

import { MicService } from './mic.service';

describe('MicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MicService = TestBed.get(MicService);
    expect(service).toBeTruthy();
  });
});
