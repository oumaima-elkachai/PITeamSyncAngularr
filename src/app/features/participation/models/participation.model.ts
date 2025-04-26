import { ParticipationStatus } from './participation-status.enum';

export interface Participation {
  id?: string;
  eventId: string;
  eventTitle?: string;
  participantId: string;
  participantEmail?: string;
  participationS: ParticipationStatus;
  participationDate: string;
}