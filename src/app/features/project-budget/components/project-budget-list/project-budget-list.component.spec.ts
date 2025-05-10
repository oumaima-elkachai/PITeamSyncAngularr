import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBudgetsListComponent } from './project-budget-list.component';

describe('ProjectBudgetListComponent', () => {
  let component: ProjectBudgetsListComponent;
  let fixture: ComponentFixture<ProjectBudgetsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectBudgetsListComponent]
    });
    fixture = TestBed.createComponent(ProjectBudgetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
