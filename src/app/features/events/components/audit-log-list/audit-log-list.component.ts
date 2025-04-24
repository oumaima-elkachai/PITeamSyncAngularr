import { Component, OnInit } from '@angular/core';
import { AuditLog } from 'src/app/features/events/models/AuditLog.model';
import { AuditLogService } from 'src/app/core/services/auditLog/audit-log.service';

@Component({
  selector: 'app-audit-log-list',
  templateUrl: './audit-log-list.component.html',
  styleUrls: ['./audit-log-list.component.css']
})

export class AuditLogListComponent implements OnInit {
  auditLogs: AuditLog[] = [];
  loading = false;
  error: string | null = null;

  constructor(private auditLogService: AuditLogService) {}

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  loadAuditLogs(): void {
    this.loading = true;
    this.auditLogService.getAllAuditLogs()
      .subscribe({
        next: (logs) => {
          this.auditLogs = logs;
          this.loading = false;
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
        },
        error: (err) => {
          this.error = 'Failed to filter logs';
          this.loading = false;
        }
      });
  }
}