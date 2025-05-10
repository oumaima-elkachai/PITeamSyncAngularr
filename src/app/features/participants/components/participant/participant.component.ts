import { Component, OnInit } from '@angular/core';
import { ParticipantService } from 'src/app/core/services/participant/participant.service';
import { Participant } from 'src/app/features/participants/models/participant.model';
@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})

export class ParticipantComponent implements OnInit {
  participants: Participant[] = [];
  loading = false;
  error: string | null = null;

  constructor(private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.loading = true;
    this.participantService.getAllParticipants()
      .subscribe({
        next: (data) => {
          this.participants = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading participants';
          this.loading = false;
          console.error('Error:', error);
        }
      });
  }

  deleteParticipant(id: string): void {
    if (confirm('Are you sure you want to delete this participant?')) {
      this.participantService.deleteParticipant(id)
        .subscribe({
          next: () => {
            this.participants = this.participants.filter(p => p.id !== id);
          },
          error: (error) => {
            console.error('Error deleting participant:', error);
          }
        });
    }
  }
}