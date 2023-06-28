import { TestBed } from '@angular/core/testing';

import { AssistentService } from './assistent.service';

describe('AssistentService', () => {
  let service: AssistentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
