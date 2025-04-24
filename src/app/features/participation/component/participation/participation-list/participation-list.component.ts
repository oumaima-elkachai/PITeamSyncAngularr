import { Component, OnInit } from '@angular/core';
import { ParticipationService } from '../../../../../core/services/participation/participation.service';
import { ParticipationStatus } from '../../../models/participation-status.enum';
import { Event } from 'src/app/features/events/models/event.model';
import{Participant} from 'src/app/features/participants/models/participant.model';
import { Participation } from 'src/app/features/participation/models/participation.model';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-participation-list',
  templateUrl: './participation-list.component.html',
  styleUrls: ['./participation-list.component.css']
})
export class ParticipationListComponent implements OnInit {
  participations: Participation[] = [];
  loading = false;
  error: string | null = null;
  ParticipationStatus = ParticipationStatus;

  constructor(private participationService: ParticipationService) { }

  ngOnInit(): void {
    this.loadParticipations();
  }

  loadParticipations(): void {
    this.loading = true;
    
    this.participationService.getParticipationsByEvent('680a953281e1904df49a2d17')
      .subscribe({
        next: (participations) => {
          const detailsRequests = participations.map(participation => {
            return forkJoin({
              participation: Promise.resolve(participation),
              eventTitle: this.participationService.getEventTitle(participation.eventId),
              participantEmail: this.participationService.getParticipantEmail(participation.participantId)
            });
          });

          forkJoin(detailsRequests).subscribe({
            next: (results) => {
              this.participations = results.map(result => ({
                ...result.participation,
                eventTitle: result.eventTitle,
                participantEmail: result.participantEmail
              }));
              this.loading = false;
            },
            error: (error) => {
              console.error('Error loading details:', error);
              this.error = 'Error loading participation details';
              this.loading = false;
            }
          });
        },
        error: (error) => {
          console.error('Error loading participations:', error);
          this.error = 'Error loading participations';
          this.loading = false;
        }
      });
  }


  /*loadParticipations(): void {
    this.loading = true;
    console.log('Loading participations...'); // Debug log
    
    // Get all participations for the specific event
    this.participationService.getParticipationsByEvent('680a953281e1904df49a2d17')
      .subscribe({
        next: (data) => {
          console.log('Received participations:', data); // Debug log
          this.participations = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading participations:', error); // Debug log
          this.error = 'Error loading participations';
          this.loading = false;
        }
      });
  }*/

  updateStatus(id: string, status: ParticipationStatus): void {
    this.loading = true;
    this.participationService.updateParticipationStatus(id, status)
      .subscribe({
        next: () => {
          this.loadParticipations(); // Reload after update
        },
        error: (error) => {
          console.error('Error updating status:', error);
          this.error = 'Error updating participation status';
          this.loading = false;
        }
      });
  }

  filterByParticipant(participantId: string): void {
    if (!participantId.trim()) {
      this.loadParticipations();
      return;
    }
    this.loading = true;
    this.participationService.getParticipationsByParticipant(participantId)
      .subscribe({
        next: (data: Participation[]) => { // Specify type for data
          this.participations = data;
          this.loading = false;
        },
        error: (error: any) => { // Specify type for error
          this.error = 'Error filtering by participant';
          this.loading = false;
        }
      });
  }

  filterByEvent(eventId: string): void {
    if (!eventId.trim()) {
      this.loadParticipations();
      return;
    }
    this.loading = true;
    this.participationService.getParticipationsByEvent(eventId)
      .subscribe({
        next: (data) => {
          this.participations = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error filtering by event';
          this.loading = false;
        }
      });
  }
}
