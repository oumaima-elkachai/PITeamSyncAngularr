import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  projectId!: string;
  isLoading = true;

  statusOptions = ['Active', 'On Hold', 'Completed'];
  typeOptions = ['Engineering', 'Design', 'Marketing', 'Research'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private projectService: ProjectService
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      owner: ['John Doe', Validators.required],
      dueDate: ['', Validators.required],
      status: ['Active', Validators.required],
      type: ['Engineering', Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.loadProject();
  }

  private loadProject(): void {
    this.projectService.getProject(this.projectId).subscribe({
      next: (project) => {
        this.projectForm.patchValue({
          ...project,
          dueDate: new Date(project.dueDate).toISOString().split('T')[0]
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.router.navigate(['/projects']);
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const updatedProject = {
        ...this.projectForm.value,
        id: this.projectId,
        dueDate: new Date(this.projectForm.value.dueDate).toISOString()
      };

      this.projectService.updateProject(this.projectId, updatedProject).subscribe({
        next: () => this.router.navigate(['/projects', this.projectId]),
        error: (err) => console.error('Error updating project:', err)
      });
    }
  }
}