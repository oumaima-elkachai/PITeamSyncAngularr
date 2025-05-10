import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { JobPostingModule } from './features/job-posting/job-posting.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { EventsModule } from './features/events/events.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ParticipationsModule } from './features/participation/participations.module';
import { ParticipantsModule } from './features/participants/participants.module';
import { ScheduleService } from './core/services/schedule/schedule.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

import { RecommendationModule } from 'src/app/features/recommendation/recommendation.module';

import { RecommendationService } from 'src/app/core/services/recommendation/recommendation.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CombinedViewFrontModule } from './features/combined-view-front/combined-view-front.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    EventsModule,
    ParticipationsModule,
    ParticipantsModule,
    JobPostingModule,
    RecommendationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true, // Added close button
      enableHtml: true // Enable HTML in toast messages
    }),
    MatSnackBarModule,
    NgApexchartsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CombinedViewFrontModule
  ],
  exports: [
    // Export the module to make it available for other modules
  ],
  providers: [
    ScheduleService,
    RecommendationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
