import { ParticipationStatus } from './participation-status.enum';

export interface Participation {
  id?: string;
  eventId: string;
  eventTitle?: string;
  eventType?: string;  // Add this property
  participantId: string;
  participantEmail?: string;
  participationS: ParticipationStatus;
  participationDate: string;
}