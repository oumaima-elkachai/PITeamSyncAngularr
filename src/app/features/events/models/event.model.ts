import { EventStatus } from "./event-status.enum";
import { TypeEvent } from "./event-type.enum";

export interface Event {
  idEvent?: string;
  title: string;
  description: string;
  typeS?: EventStatus;
  type?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  reminderSent?: boolean;
  participantIds?: string[];
  timeZone?: string;
  capacity: number;
  imageUrl: string;
  backgroundColor?: string;
  eventType?: string;
}
