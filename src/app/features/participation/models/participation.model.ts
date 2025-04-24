import { ParticipationStatus } from './participation-status.enum';

export interface Participation {
    id?: string;
    participantId: string;
    eventId: string;
    participationDate: Date;
    participationS: ParticipationStatus;
    // Add these optional fields
    eventTitle?: string;
    participantEmail?: string;
}