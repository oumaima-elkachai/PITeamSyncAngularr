import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load projects. Please try again later.';
        this.isLoading = false;
        console.error('Error loading projects:', err);
      }
    });
  }

  onDeleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          this.projects = this.projects.filter(p => p.id !== projectId);
        },
        error: (err) => {
          console.error('Error deleting project:', err);
          alert('Failed to delete project.');
        }
      });
    }
  }

  navigateToDetails(projectId: string): void {
    this.router.navigate(['/projects', projectId]);
  }
}