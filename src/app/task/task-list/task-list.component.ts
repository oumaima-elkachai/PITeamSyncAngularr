import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { EmployeeService } from '../../services/employee.service';
import { AttachmentService } from '../../services/attachment.service';
import { Task } from 'src/app/models/task.model';
import { Employee } from 'src/app/models/employee.model';
import { Attachment } from 'src/app/models/attachment.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
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

  getProgress(): number {
    if (!this.tasks.length) return 0;
    const completed = this.tasks.filter(t => t.status === 'DONE').length;
    return Math.round((completed / this.tasks.length) * 100);
  }

  getEmployeeName(employeeId: string): string {
    const employee = this.employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unassigned';
  }

  // All task actions
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

  deleteAttachment(attachmentId: string) {
    if (confirm('Are you sure you want to delete this attachment?')) {
      this.attachmentService.deleteAttachment(attachmentId).subscribe({
        next: () => {
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

  private updateTaskInList(updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index > -1) this.tasks[index] = updatedTask;
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    alert(message);
  }

  navigateToTask(taskId: string): void {
    this.router.navigate(['/projects', this.projectId, 'tasks', taskId]);
  }
}