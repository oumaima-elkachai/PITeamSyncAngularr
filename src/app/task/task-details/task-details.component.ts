import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html'
})
export class TaskDetailsComponent implements OnInit {
  task!: Task;
  isEditing = false;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      this.router.navigate(['/projects']);
      return;
    }
    this.loadTask(taskId);
  }

  loadTask(taskId: string): void {
    this.taskService.getTaskById(taskId).subscribe({
      next: (task: Task) => {
        this.task = task;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Task not found.';
        this.isLoading = false;
        console.error('Error loading task:', err);
      }
    });
  }

  onUpdateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask.id!, updatedTask).subscribe({
      next: (task) => {
        this.task = task;
        this.isEditing = false;
        alert('Task updated successfully!');
      },
      error: (err) => {
        console.error('Error updating task:', err);
        alert('Failed to update task.');
      }
    });
  }
}