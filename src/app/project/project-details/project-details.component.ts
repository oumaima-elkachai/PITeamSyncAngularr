import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;
  tasks: Task[] = [];
  isLoading = true;
  teamMembers: Employee[] = [];
  loadingMembers = true;
  errorMessage: string | null = null;
  employees: Employee[] = []; // 1. Add employees property
  loadingTasks = true;
  taskError = '';
  memberError = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService,
    private employeeService: EmployeeService // Add this line

  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (!projectId) {
      this.router.navigate(['/projects']);
      return;
    }

    this.loadProject(projectId);
    this.loadTasks(projectId);
    this.loadEmployees(); // 2. Call the method

  }


  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees: Employee[]) => this.employees = employees,
      error: (err: any) => console.error('Error loading employees:', err)
    });
  }

  
  loadProject(projectId: string): void {
    this.projectService.getProject(projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Project not found.';
        this.isLoading = false;
        console.error('Error loading project:', err);
      }
    });
  }

  loadTasks(projectId: string): void {
    this.loadingTasks = true;  // Initialize loading state
    this.taskService.getTasksByProject(projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loadingTasks = false;  // Update loading state
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.taskError = 'Failed to load tasks';  // Set error message
        this.loadingTasks = false;
      }
    });
  }

  private loadTeamMembers(projectId: string): void {
    this.loadingMembers = true;
    this.employeeService.getEmployeesByProject(projectId).subscribe({
      next: (members) => {
        this.teamMembers = members;
        this.loadingMembers = false;
      },
      error: (err) => {
        this.memberError = 'Failed to load team members';
        this.loadingMembers = false;
      }
    });
  }

  getProgress(): number {
    if (!this.tasks.length) return 0;
    const completed = this.tasks.filter(t => t.status === 'DONE').length;
    return Math.round((completed / this.tasks.length) * 100);
  }

  onUpdateProject(updatedProject: Project): void {
    this.projectService.updateProject(updatedProject.id!, updatedProject).subscribe({
      next: (project) => {
        this.project = project;
        alert('Project updated successfully!');
      },
      error: (err) => {
        console.error('Error updating project:', err);
        alert('Failed to update project.');
      }
    });
  }

  onDeleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: (err) => console.error('Error deleting project:', err)
      });
    }
  }

  getEmployeeName(employeeId: string): string {
    if (!this.employees.length) return 'Loading...';
    const employee = this.employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unassigned';
  }


  
}