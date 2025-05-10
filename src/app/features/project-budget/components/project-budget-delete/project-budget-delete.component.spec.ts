import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBudgetDeleteComponent } from './project-budget-delete.component';

describe('ProjectBudgetDeleteComponent', () => {
  let component: ProjectBudgetDeleteComponent;
  let fixture: ComponentFixture<ProjectBudgetDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectBudgetDeleteComponent]
    });
    fixture = TestBed.createComponent(ProjectBudgetDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
