import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParticipationListComponent } from './component/participation/participation-list/participation-list.component';
import { ParticipationDetailsComponent } from './component/participation/participation-details/participation-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  { path: '', component: ParticipationListComponent },
  { path: 'details/:id', component: ParticipationDetailsComponent }
];

@NgModule({
  declarations: [
    ParticipationListComponent,
    ParticipationDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports: [
    ParticipationListComponent,
    ParticipationDetailsComponent
  ]
})
export class ParticipationsModule { }