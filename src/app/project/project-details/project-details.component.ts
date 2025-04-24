import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { Attachment } from '../../models/attachment.model';
import { AttachmentService } from '../../services/attachment.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html'
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;
  tasks: Task[] = [];
  isLoading = true;
  teamMembers: Employee[] = [];
  loadingMembers = true;
  errorMessage: string | null = null;
  employees: Employee[] = []; // 1. Add employees property
  loadingTasks = true;
  taskError = '';
  memberError = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService,
    private attachmentService: AttachmentService,
    private employeeService: EmployeeService // Add this line

  ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (!projectId) {
      this.router.navigate(['/projects']);
      return;
    }

    this.loadProject(projectId);
    this.loadTasks(projectId);
    this.loadEmployees(); // 2. Call the method
    this.loadTeamMembers(projectId);

  }


  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees: Employee[]) => this.employees = employees,
      error: (err: any) => console.error('Error loading employees:', err)
    });
  }


  loadProject(projectId: string): void {
    this.projectService.getProject(projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Project not found.';
        this.isLoading = false;
        console.error('Error loading project:', err);
      }
    });
  }

  loadTasks(projectId: string): void {
    this.loadingTasks = true;  // Initialize loading state
    this.taskService.getTasksByProject(projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.tasks.forEach(task => {
          if (task.id) {
            this.loadAttachments(task.id);
          }
        });
        this.loadingTasks = false;  // Update loading state
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.taskError = 'Failed to load tasks';  // Set error message
        this.loadingTasks = false;
      }
    });
  }

  private loadTeamMembers(projectId: string): void {
    this.loadingMembers = true;
    this.employeeService.getEmployeesByProject(projectId).subscribe({
      next: (members) => {
        this.teamMembers = members;
        this.loadingMembers = false;
      },
      error: (err) => {
        this.memberError = 'Failed to load team members';
        this.loadingMembers = false;
      }
    });
  }

  getProgress(): number {
    if (!this.tasks.length) return 0;
    const completed = this.tasks.filter(t => t.status === 'DONE').length;
    return Math.round((completed / this.tasks.length) * 100);
  }

  onUpdateProject(updatedProject: Project): void {
    this.projectService.updateProject(updatedProject.id!, updatedProject).subscribe({
      next: (project) => {
        this.project = project;
        alert('Project updated successfully!');
      },
      error: (err) => {
        console.error('Error updating project:', err);
        alert('Failed to update project.');
      }
    });
  }

  onDeleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: (err) => console.error('Error deleting project:', err)
      });
    }
  }

  getEmployeeName(employeeId: string): string {
    if (!this.employees.length) return 'Loading...';
    const employee = this.employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unassigned';
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

   loadingAttachments: { [taskId: string]: boolean } = {};

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



}