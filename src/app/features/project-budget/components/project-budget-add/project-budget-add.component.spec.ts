import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBudgetsAddComponent } from './project-budget-add.component';

describe('ProjectBudgetAddComponent', () => {
  let component: ProjectBudgetsAddComponent;
  let fixture: ComponentFixture<ProjectBudgetsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectBudgetsAddComponent]
    });
    fixture = TestBed.createComponent(ProjectBudgetsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
