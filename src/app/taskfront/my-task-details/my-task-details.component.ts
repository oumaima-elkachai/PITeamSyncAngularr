import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-task-details',
  templateUrl: './my-task-details.component.html',
  styleUrls: ['./my-task-details.component.css']
})
export class MyTaskDetailsComponent implements OnInit {
  task!: Task;
  isLoading = true;
  extensionForm: FormGroup;
  showExtensionForm = false;
  statusOptions = Object.values(TaskStatus);
  attachments: File[] = []; // Temporary until backend implementation

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.extensionForm = this.fb.group({
      newDeadline: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id')!;
    this.loadTask(taskId);
  }

  private loadTask(taskId: string): void {
    this.taskService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.task = task;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading task:', err);
        this.isLoading = false;
      }
    });
  }

  updateStatus(newStatus: TaskStatus): void {
    const updatedTask = { ...this.task, status: newStatus };
    this.taskService.updateTask(this.task.id!, updatedTask).subscribe({
      next: () => this.task.status = newStatus,
      error: (err) => console.error('Error updating status:', err)
    });
  }

  requestExtension(): void {
    if (this.extensionForm.valid) {
      const newDeadline = this.extensionForm.get('newDeadline')?.value;
      const updatedTask = { 
        ...this.task, 
        deadline: new Date(newDeadline).toISOString()
      };

      this.taskService.updateTask(this.task.id!, updatedTask).subscribe({
        next: () => {
          this.task.deadline = updatedTask.deadline;
          this.showExtensionForm = false;
          this.extensionForm.reset();
        },
        error: (err) => console.error('Error updating deadline:', err)
      });
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.attachments.push(files[0]);
      // Here you would typically upload to backend
    }
  }

  removeAttachment(index: number): void {
    this.attachments.splice(index, 1);
  }
}