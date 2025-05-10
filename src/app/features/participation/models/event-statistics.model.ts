export interface EventStatistics {
    totalParticipants: number;
    confirmed: number;
    pending: number;
    cancelled: number;
    waitlisted: number;
    eventId: string;
    eventTitle: string;
}
