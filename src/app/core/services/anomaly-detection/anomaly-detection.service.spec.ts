import { TestBed } from '@angular/core/testing';

import { AnomalyDetectionService } from './anomaly-detection.service';

describe('AnomalyDetectionService', () => {
  let service: AnomalyDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnomalyDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
