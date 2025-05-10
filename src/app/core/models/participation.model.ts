import { ParticipationStatus } from '../../features/participation/models/participation-status.enum';

export interface Participation {
    id?: string;
    _id?: string;  // MongoDB ID
    participantId: string;
    eventId: string;
    participantEmail?: string;  // Populated field
    eventTitle?: string;      // Populated field
    participationDate: Date;
    participationS?: ParticipationStatus;
    participationStatus?: string;  // From backend
    eventType?: string;
    _class?: string;
}