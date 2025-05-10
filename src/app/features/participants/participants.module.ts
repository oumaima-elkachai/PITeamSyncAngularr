import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { ParticipantComponent } from './components/participant/participant.component';


// Services
import { ParticipantService } from 'src/app/core/services/participant/participant.service';


@NgModule({
  declarations: [
    ParticipantComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
        { path: '', component: ParticipantComponent },
    ])
  ],
  providers: [
    ParticipantService
  ],
  exports: [
   ParticipantComponent
   // ParticipantDetailsComponent,
    //ParticipantFormComponent
  ]
})
export class ParticipantsModule { }