import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-my-project-details',
  templateUrl: './my-project-details.component.html',
  styleUrls: ['./my-project-details.component.css']
})
export class MyProjectDetailsComponent implements OnInit {
  project!: Project;
  tasks: Task[] = [];
  isLoading = true;
  currentEmployeeId = '680b9de4dace5fa9cc248d33'; // Hardcoded for now

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id')!;
    this.loadProject(projectId);
  }

  private loadProject(projectId: string): void {
    this.projectService.getProject(projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.loadProjectTasks(projectId);
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.isLoading = false;
      }
    });
  }

  private loadProjectTasks(projectId: string): void {
    this.taskService.getTasksByProject(projectId).subscribe({
      next: (tasks) => {
        // Filter tasks assigned to current employee
        this.tasks = tasks.filter(t => t.employeeId === this.currentEmployeeId);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.isLoading = false;
      }
    });
  }
}