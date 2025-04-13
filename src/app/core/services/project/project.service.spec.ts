import { TestBed } from '@angular/core/testing';
import { ProjetService } from './project.service';

describe('ProjectService', () => {
  let service: ProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
