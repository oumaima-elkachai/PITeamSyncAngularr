import { TestBed } from '@angular/core/testing';

import { JobPostingService } from './job-posting.service';

describe('JobPostingService', () => {
  let service: JobPostingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPostingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
