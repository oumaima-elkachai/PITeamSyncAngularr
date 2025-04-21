import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  @Input() projectId!: string;
  tasks: Task[] = [];
  employees: Employee[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  private router: Router = new Router;

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,

  ) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadEmployees();
  }

  loadTasks(): void {
    if (!this.projectId) return;

    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load tasks.';
        this.isLoading = false;
        console.error('Error loading tasks:', err);
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => this.employees = employees,
      error: (err) => console.error('Error loading employees:', err)
    });
  }

  // task-list.component.ts
  navigateToTask(taskId: string): void {
    this.router.navigate(['/tasks', taskId]);
  }

  onAssignTask(taskId: string, employeeId: string): void {
    this.taskService.assignTask(taskId, employeeId).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index > -1) this.tasks[index] = updatedTask;
      },
      error: (err) => {
        console.error('Error assigning task:', err);
        alert('Failed to assign task.');
      }
    });
  }

  onDeleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== taskId);
        },
        error: (err: any) => {
          console.error('Error deleting task:', err);
          alert('Failed to delete task.');
        }
      });
    }
  }

  approveExtension(taskId: string) {
    this.taskService.approveExtension(taskId).subscribe({
      next: (updatedTask) => this.updateTaskInList(updatedTask),
      error: (err) => this.handleError('Approval failed', err)
    });
  }

  rejectExtension(taskId: string) {
    this.taskService.rejectExtension(taskId).subscribe({
      next: (updatedTask) => this.updateTaskInList(updatedTask),
      error: (err) => this.handleError('Rejection failed', err)
    });
  }

  downloadAttachment(attachmentId: string) {
    this.taskService.downloadAttachment(attachmentId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      // Implement actual download logic
    });
  }

  private updateTaskInList(updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
    }
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    alert(message);
  }

  
}