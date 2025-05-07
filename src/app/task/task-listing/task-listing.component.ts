// task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { AttachmentService } from 'src/app/services/attachment.service';
import { Task } from 'src/app/models/task.model';
import { Employee } from 'src/app/models/employee.model';
import { Attachment } from 'src/app/models/attachment.model';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css']
})
export class TaskListingComponent implements OnInit {
  projectId!: string;
  tasks: Task[] = [];
  employees: Employee[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  loadingAttachments: { [taskId: string]: boolean } = {};
  statusFilter = 'ALL';
  assigneeFilter = 'ALL';
  sortBy = 'deadline';
  viewMode = 'card';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private attachmentService: AttachmentService
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.loadTasks();
    this.loadEmployees();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.tasks.forEach(task => {
          if (task.id) this.loadAttachments(task.id);
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load tasks';
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



  get filteredTasks(): Task[] {
    let filtered = this.tasks;

    // Status filter
    if (this.statusFilter !== 'ALL') {
      filtered = filtered.filter(task => task.status === this.statusFilter);
    }

    // Assignee filter
    if (this.assigneeFilter !== 'ALL') {
      filtered = filtered.filter(task => task.employeeId === this.assigneeFilter);
    }

    // Sorting
    return filtered.sort((a, b) => {
      if (this.sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return (a.title > b.title) ? 1 : -1;
    });
  }

  getEmployeeName(employeeId: string): string {
    const employee = this.employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unassigned';
  }

  // Add all task action methods from ProjectDetailsComponent here
  // (approveExtension, rejectExtension, downloadAttachment, etc.)

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
    this.attachmentService.downloadAttachment(attachmentId).subscribe({
      next: ({ blob, fileName }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Download failed:', err);
        alert('Failed to download file');
      }
    });
  }


  loadAttachments(taskId: string): void {
    this.loadingAttachments[taskId] = true;
    this.attachmentService.getTaskAttachments(taskId).subscribe({
      next: (attachments) => {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) task.attachments = attachments;
        this.loadingAttachments[taskId] = false;
      },
      error: () => this.loadingAttachments[taskId] = false
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

  // project-details.component.ts
  deleteAttachment(attachmentId: string) {
    if (confirm('Are you sure you want to delete this attachment?')) {
      this.attachmentService.deleteAttachment(attachmentId).subscribe({
        next: () => {
          // Remove from local state
          this.tasks = this.tasks.map(task => ({
            ...task,
            attachments: task.attachments?.filter(a => a.id !== attachmentId)
          }));
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('Failed to delete attachment');
        }
      });
    }
  }

  deleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('Failed to delete task');
        }
      });
    }
  }

}