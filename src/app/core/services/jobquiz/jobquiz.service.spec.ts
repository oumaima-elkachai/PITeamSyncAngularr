import { TestBed } from '@angular/core/testing';

import { JobquizService } from './jobquiz.service';

describe('JobquizService', () => {
  let service: JobquizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobquizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
