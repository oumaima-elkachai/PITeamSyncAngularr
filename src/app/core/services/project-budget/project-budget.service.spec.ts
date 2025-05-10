import { TestBed } from '@angular/core/testing';

import { ProjectBudgetService } from './project-budget.service';

describe('ProjectBudgetService', () => {
  let service: ProjectBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
