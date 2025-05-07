import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project, ProjectDepartment } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  projectId!: string;
  isLoading = true;
  isSidebarCollapsed = false;

  statusOptions = ['Active', 'On Hold', 'Completed'];
  typeOptions = ['Engineering', 'Design', 'Marketing', 'Research'];

  departments = Object.values(ProjectDepartment);


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
      type: ['Engineering', Validators.required],
      department:  [ProjectDepartment.ENGINEERING, Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.loadProject();
  }

  handleSidebarToggle(state: boolean) {
    this.isSidebarCollapsed = state;
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
        next: () => this.router.navigate(['/projectsadmin', this.projectId]),
        error: (err) => console.error('Error updating project:', err)
      });
    }
  }
}