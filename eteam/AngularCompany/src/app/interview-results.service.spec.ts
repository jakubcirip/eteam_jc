import { TestBed } from '@angular/core/testing';

import { InterviewResultsService } from './interview-results.service';

describe('InterviewResultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterviewResultsService = TestBed.get(InterviewResultsService);
    expect(service).toBeTruthy();
  });
});
