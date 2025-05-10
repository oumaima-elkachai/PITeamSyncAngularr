import { EventStatus } from '../models/event-status.enum';

export const getEventColor = (status: EventStatus): string => {
  switch (status) {
    case EventStatus.PLANNED:
      return '#FFC107'; // Warmer, more pleasant yellow
    case EventStatus.COMPLETED:
      return '#90EE90'; // Light Green
    case EventStatus.CANCELLED:
      return '#FFB6C1'; // Light Red
    default:
      return '#FFC107';
  }
};
