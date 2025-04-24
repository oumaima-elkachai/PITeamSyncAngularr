export interface Participant {
    id: string;
    name: string;
    email: string;
    eventIds?: string[];
    certificationIds?: string[];
}