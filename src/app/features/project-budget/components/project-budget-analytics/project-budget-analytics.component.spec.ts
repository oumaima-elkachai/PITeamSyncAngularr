import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBudgetAnalyticsComponent } from './project-budget-analytics.component';

describe('ProjectBudgetAnalyticsComponent', () => {
  let component: ProjectBudgetAnalyticsComponent;
  let fixture: ComponentFixture<ProjectBudgetAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectBudgetAnalyticsComponent]
    });
    fixture = TestBed.createComponent(ProjectBudgetAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
