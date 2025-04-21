import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  statusOptions = ['Active', 'On Hold', 'Completed'];
  typeOptions = ['Engineering', 'Design', 'Marketing', 'Research'];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      owner: ['John Doe', Validators.required], // Default owner
      dueDate: ['', Validators.required],
      status: ['Active', Validators.required],
      type: ['Engineering', Validators.required]
    });
  }

  ngOnInit(): void {}

  
  onSubmit() {
    if (this.projectForm.valid) {
      const projectData = {
        ...this.projectForm.value,
        dueDate: new Date(this.projectForm.value.dueDate).toISOString()
      };

      this.projectService.createProject(projectData).subscribe({
        next: (createdProject) => {
          this.router.navigate(['/projects', createdProject.id]);
        },
        error: (err) => console.error('Error creating project:', err)
      });
    }
  }
}