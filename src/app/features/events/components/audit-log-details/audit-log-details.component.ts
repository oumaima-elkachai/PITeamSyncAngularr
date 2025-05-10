import { Component,Input } from '@angular/core';
import { AuditLog } from '../../models/AuditLog.model';

type AuditAction = 'ADD' | 'REMOVE' | 'UPDATE';

@Component({
  selector: 'app-audit-log-details',
  templateUrl: './audit-log-details.component.html',
  styleUrls: ['./audit-log-details.component.css']
})
export class AuditLogDetailsComponent {
  // Fix the initialization error by making the input optional
  @Input() log?: AuditLog;

  // Fix the indexing error by using type assertion
  getActionClass(action: string): string {
    const classes: Record<AuditAction, string> = {
      'ADD': 'text-success',
      'REMOVE': 'text-danger',
      'UPDATE': 'text-warning'
    };
    
    return (action in classes) ? classes[action as AuditAction] : 'text-secondary';
  }
}