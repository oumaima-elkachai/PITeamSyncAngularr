import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttachmentService } from 'src/app/services/attachment.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-my-task-details',
  templateUrl: './my-task-details.component.html',
  styleUrls: ['./my-task-details.component.css']
})
export class MyTaskDetailsComponent implements OnInit {

  newLink = '';
  linkDescription = '';
  task!: Task;
  isLoading = true;
  extensionForm: FormGroup;
  showExtensionForm = false;
  statusOptions = Object.values(TaskStatus);
  attachments: File[] = []; // Temporary until backend implementation
  currentEmployeeId = '67fd82fe2d7dc679a06c1aca'; // Get from auth service
  uploadLoading = false; // Add loading state for uploads
  showSuccessMessage = false;
  showErrorMessage = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private fb: FormBuilder,
    private attachmentService: AttachmentService, // Add this

  ) {
    this.extensionForm = this.fb.group({
      newDeadline: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id')!;
    this.loadTaskWithAttachments(taskId); // Changed from loadTask
  }

  private loadTaskWithAttachments(taskId: string): void {
    this.isLoading = true;

    // First load task details
    this.taskService.getTaskById(taskId).pipe(
      // Then load attachments
      switchMap(task => {
        this.task = task;
        return this.attachmentService.getTaskAttachments(taskId);
      })
    ).subscribe({
      next: (attachments) => {
        this.task.attachments = attachments;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
      }
    });
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

  // my-task-details.component.ts
  // my-task-details.component.ts
  requestExtension(): void {
    if (this.extensionForm.valid) {
      const rawDate = this.extensionForm.get('newDeadline')?.value;
      // Convert string to Date object
      const newDeadline = new Date(rawDate);
      
      this.taskService.requestExtension(this.task.id!, newDeadline)
        .subscribe({
          next: (updatedTask) => {
            this.task = updatedTask;
            this.showExtensionForm = false;
            this.extensionForm.reset();
          },
          error: (err) => console.error('Error:', err)
        });
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.uploadLoading = true;
      const file = files[0];

      this.attachmentService.uploadFile(
        file,
        this.task.id!, // Task ID from current task
        this.currentEmployeeId
      ).subscribe({
        next: (attachment) => {
          if (!this.task.attachments) this.task.attachments = [];
          this.task.attachments.push(attachment);
          this.uploadLoading = false;
        },
        error: (err) => {
          console.error('Upload failed:', err);
          this.uploadLoading = false;
        }
      });
    }
  }

  removeAttachment(attachmentId: string): void {
    this.attachmentService.deleteAttachment(attachmentId).subscribe({
      next: () => {
        this.task.attachments = this.task.attachments?.filter(
          a => a.id !== attachmentId
        ) || [];
      },
      error: (err: any) => console.error('Delete failed:', err)
    });
  }

  addLink() {
    if (this.newLink) {
      const linkRequest = {
        url: this.newLink,
        description: this.linkDescription,
        createdBy: this.currentEmployeeId
      };

      this.taskService.addLink(this.task.id!, linkRequest).subscribe({
        next: (updatedTask: Task) => {
          this.task = updatedTask;
          this.newLink = '';
          this.linkDescription = '';
        },
        error: (err: any) => console.error('Error adding link:', err)
      });
    }
  }

  removeLink(index: number) {
    this.taskService.removeLink(this.task.id!, index).subscribe({
      next: (updatedTask: Task) => {
        this.task = updatedTask;
      },
      error: (err: any) => console.error('Error removing link:', err)
    });
  }

  
}