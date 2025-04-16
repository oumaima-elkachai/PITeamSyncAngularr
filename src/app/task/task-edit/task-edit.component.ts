import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  taskId!: string;
  projectId!: string;
  employees: any[] = [];
  isLoading = true;

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
      title: [''],
      description: [''],
      deadline: [''],
      priority: [TaskPriority.MEDIUM],
      status: [TaskStatus.TODO],
      employeeId: ['']
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['taskId'];
    this.projectId = this.route.snapshot.params['projectId'];
    this.loadTask();
    this.loadEmployees();
  }

  private loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          ...task,
          deadline: new Date(task.deadline).toISOString().split('T')[0]
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading task:', err);
        this.router.navigate(['/projects', this.projectId]);
      }
    });
  }

  private loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask = {
        ...this.taskForm.value,
        id: this.taskId,
        projectId: this.projectId,
        deadline: new Date(this.taskForm.value.deadline).toISOString()
      };

      this.taskService.updateTask(this.taskId, updatedTask).subscribe({
        next: () => this.router.navigate(['/projects', this.projectId]),
        error: (err) => console.error('Error updating task:', err)
      });
    }
  }
}