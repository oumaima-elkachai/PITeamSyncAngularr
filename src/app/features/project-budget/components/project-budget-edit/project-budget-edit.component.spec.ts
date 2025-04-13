import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBudgetEditComponent } from './project-budget-edit.component';

describe('ProjectBudgetEditComponent', () => {
  let component: ProjectBudgetEditComponent;
  let fixture: ComponentFixture<ProjectBudgetEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectBudgetEditComponent]
    });
    fixture = TestBed.createComponent(ProjectBudgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
