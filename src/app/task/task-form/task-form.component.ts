import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { EmployeeService } from '../../services/employee.service';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  employees: any[] = [];
  projectId!: string;
  isLoading = false;
  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private taskService: TaskService,
    private employeeService: EmployeeService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      deadline: ['', [Validators.required]],
      priority: [TaskPriority.MEDIUM, Validators.required],
      status: [TaskStatus.TODO, Validators.required],
      employeeId: ['']
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['projectId'];
    this.loadEmployees();
  }

  private loadEmployees(): void {
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
}