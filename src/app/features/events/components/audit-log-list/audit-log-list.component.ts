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
    this.loadAuditLogs();
    this.updatePagination();
  }

  loadAuditLogs(): void {
    this.loading = true;
    this.auditLogService.getAllAuditLogs()
      .subscribe({
        next: (logs) => {
          this.auditLogs = logs;
          this.loading = false;
          this.updatePagination();
        },
        error: (err) => {
          this.error = 'Failed to load audit logs';
          this.loading = false;
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
    this.totalPages = Math.ceil(this.auditLogs.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
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