import { TestBed } from '@angular/core/testing';

import { ScheduleServiceService } from './schedule-service.service';

describe('ScheduleServiceService', () => {
  let service: ScheduleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
