import { Component, OnInit } from '@angular/core';
import { AuditLog } from 'src/app/features/events/models/AuditLog.model';
import { AuditLogService } from 'src/app/core/services/auditLog/audit-log.service';

@Component({
  selector: 'app-audit-log-list',
  templateUrl: './audit-log-list.component.html',

styleUrls: ['./audit-log-list.component.css']
})

export class AuditLogListComponent implements OnInit {
  // Add Math property
  protected readonly Math = Math;

  auditLogs: AuditLog[] = [];
  loading = false;
  error: string | null = null;
  
  pageSize: number = 5; // Number of items per page
  currentPage: number = 1;
  totalPages: number = 1;
  paginatedLogs: any[] = [];

  constructor(private auditLogService: AuditLogService) {}

  ngOnInit(): void {
    // Remove updatePagination call here as it's called in loadAuditLogs
    this.loadAuditLogs();
  }

  loadAuditLogs(): void {
    this.loading = true;
    this.error = null; // Reset error state
    console.log('Loading audit logs...');
    
    this.auditLogService.getAllAuditLogs()
      .subscribe({
        next: (logs) => {
          console.log('Received audit logs:', logs);
          this.auditLogs = logs;
          this.loading = false;
          this.updatePagination();
        },
        error: (err) => {
          console.error('Error loading audit logs:', err);
          this.error = 'Failed to load audit logs';
          this.loading = false;
          this.auditLogs = []; // Reset logs on error
          this.updatePagination();
        }
      });
  }

  filterByParticipation(participationId: string): void {
    this.loading = true;
    this.auditLogService.getByParticipationId(participationId)
      .subscribe({
        next: (logs) => {
          this.auditLogs = logs;
          this.loading = false;
          this.updatePagination();
        },
        error: (err) => {
          this.error = 'Failed to filter logs';
          this.loading = false;
        }
      });
  }

  updatePagination() {
    if (!this.auditLogs.length) {
      this.totalPages = 0;
      this.paginatedLogs = [];
      return;
    }
    
    this.totalPages = Math.ceil(this.auditLogs.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.auditLogs.length);
    this.paginatedLogs = this.auditLogs.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}