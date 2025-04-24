export interface AuditLog {
    id?: string;
    action: 'ADD' | 'REMOVE' | 'UPDATE';  // Using literal types for better type safety
    participationId: string;
    eventId: string;
    participantId: string;
    performedBy: string;
    timestamp: Date;
    details: string;
}