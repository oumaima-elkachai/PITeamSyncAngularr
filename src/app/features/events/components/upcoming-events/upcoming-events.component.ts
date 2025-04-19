// upcoming-events.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/events/events.service';
import { Event } from '../../models/event.model';
import { DatePipe } from '@angular/common';
import { WebSocketService } from 'src/app/core/services/websocket/websocket.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css'],
  providers: [DatePipe]
})
export class UpcomingEventsComponent implements OnInit {
  todaysEvents: Event[] = [];
  isLoading = true;
  todayFormatted: string;

  constructor(
      private eventService: EventService,
      private datePipe: DatePipe,
      private websocketService: WebSocketService
  ) {
    const today = new Date();
    this.todayFormatted = this.datePipe.transform(today, 'd MMM') || '';
  }

  ngOnInit(): void {
    this.loadTodaysEvents();
  }

  loadTodaysEvents(): void {
    this.eventService.getTodayEvents().subscribe({
      next: (events) => {
        this.todaysEvents = events.sort((a, b) =>
            a.startTime.localeCompare(b.startTime));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading today events:', error);
        this.isLoading = false;
      }
    });
  }
}
