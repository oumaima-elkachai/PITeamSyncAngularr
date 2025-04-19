import { EventStatus } from "./event-status.enum";

export interface Event {
  idEvent?: string;
  title: string;
  description: string;
  typeS: EventStatus;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  reminderSent?: boolean;
  participantIds?: string[];
  timeZone?: string;
}

