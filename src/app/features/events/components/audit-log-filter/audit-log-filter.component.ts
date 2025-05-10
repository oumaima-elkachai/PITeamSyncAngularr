import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-audit-log-filter',
  templateUrl: './audit-log-filter.component.html',
  styleUrls: ['./audit-log-filter.component.css']
})
export class AuditLogFilterComponent {
  @Output() dateRangeSelected = new EventEmitter<{start: Date, end: Date}>();
  @Output() participationSelected = new EventEmitter<string>();
  @Output() eventSelected = new EventEmitter<string>();
  @Output() participantSelected = new EventEmitter<string>();

  // Fix 1: Initialize with null and use type union
  startDate: Date | null = null;
  endDate: Date | null = null;

  applyDateFilter(): void {
    if (this.startDate && this.endDate) {
      this.dateRangeSelected.emit({
        start: this.startDate,
        end: this.endDate
      });
    }
  }
}