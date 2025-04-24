import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ParticipationListComponent } from './component/participation/participation-list/participation-list.component';
import { ParticipationDetailsComponent } from './component/participation/participation-details/participation-details.component';
import { ParticipationStatusUpdateComponent } from './component/participation/participation-status-update/participation-status-update.component';
import { AuditLogListComponent } from '../events/components/audit-log-list/audit-log-list.component';

// Services
import { ParticipationService } from '../../core/services/participation/participation.service';
//import { AuditLogService } from '../../core/services/auditLog/audit-log.service';

@NgModule({
  declarations: [
    ParticipationListComponent,
    ParticipationDetailsComponent,
    ParticipationStatusUpdateComponent,
   // AuditLogListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'participations', component: ParticipationListComponent },
      { path: 'participations/:id', component: ParticipationDetailsComponent },
      { path: 'participations/:id/audit-logs', component: AuditLogListComponent }
    ])
  ],
  providers: [
    ParticipationService,
    //AuditLogService
  ],
  exports: [
    ParticipationListComponent,
    ParticipationDetailsComponent,
    ParticipationStatusUpdateComponent,
    //AuditLogListComponent
  ]
})
export class ParticipationsModule { }