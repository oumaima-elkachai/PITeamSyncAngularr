import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { EmployeeService } from '../../services/employee.service';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectDepartment } from 'src/app/models/project.model';
import { Employee } from 'src/app/models/employee.model';
import { AiService } from 'src/app/services/ai.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  employees: any[] = [];
  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  projectId!: string;
  project: any; // Add project property
  isGenerating = false; // Add this property

  isLoading = false;
  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);
  skills = ['Frontend Development', 'Backend Development', 'UI/UX Design',
    'Quality Assurance', 'Project Management', 'Data Analysis', 'Testing'];
  errorMessage: string | undefined;


  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private aiService: AiService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      requiredSkills: [[], Validators.required],

      deadline: ['', [Validators.required]],
      priority: [TaskPriority.MEDIUM, Validators.required],
      status: [TaskStatus.TODO, Validators.required],
      employeeId: ['']
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['projectId'];
    this.projectService.getProject(this.projectId).subscribe(project => {
      this.project = project;                   // ← add this line
      this.loadEmployees(project.department);
    });
    
    this.projectId = this.route.snapshot.params['projectId'];
    // load every employee once
    this.employeeService.getAllEmployees().subscribe(list => {
      this.allEmployees = list;
      this.filteredEmployees = list;
    });
    // whenever skills change, re-filter
    this.taskForm.get('requiredSkills')!.valueChanges
      .subscribe((skills: string[]) => {
        this.filteredEmployees = this.allEmployees.filter(emp =>
          emp.skills?.some(s => skills.includes(s))
        );
      });
  }

  private loadEmployees(department: ProjectDepartment): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => this.employees = employees,
      error: (err) => console.error('Error loading employees:', err)
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      const taskData: Task = {
        ...this.taskForm.value,
        projectId: this.projectId,
        deadline: new Date(this.taskForm.value.deadline).toISOString()
      };

      this.taskService.createTask(taskData).subscribe({
        next: (createdTask) => {
          this.router.navigate(['/projects', this.projectId]);
        },
        error: (err) => {
          console.error('Error creating task:', err);
          this.isLoading = false;
        }
      });
    }
  }

  onSkillToggle(skill: string, checked: boolean) {
    const ctrl = this.taskForm.get('requiredSkills')!;
    const current: string[] = ctrl.value || [];

    if (checked) {
      // add if missing
      if (!current.includes(skill)) {
        ctrl.setValue([...current, skill]);
      }
    } else {
      // remove
      ctrl.setValue(current.filter(s => s !== skill));
    }

    // mark dirty/validate
    ctrl.markAsDirty();
    ctrl.updateValueAndValidity();
  }

  generateDescription(): void {
    const taskTitle = this.taskForm.get('title')?.value;
    
    if (!taskTitle) {
      this.errorMessage = 'Please enter a task title first';
      return;
    }
  
    this.isGenerating = true;
    this.errorMessage = '';
  
    this.aiService.generateTaskDescription(
      taskTitle,
      this.project?.title || '',
      this.taskForm.get('type')?.value || ''
    ).subscribe({
      next: (response) => {
        this.taskForm.patchValue({ description: response.description });
        this.isGenerating = false;
      },
      error: (err) => {
        console.error('AI Error:', err);
        this.errorMessage = err.error?.error || 'Failed to generate description';
        this.isGenerating = false;
      }
    });
  }




}