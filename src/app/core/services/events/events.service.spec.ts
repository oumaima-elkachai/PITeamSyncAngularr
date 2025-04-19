import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './events.service';
import { Event } from '../../../features/events/models/event.model';
import {EventStatus} from "../../../features/events/models/event-status.enum";

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /*it('should fetch all events from backend', () => {
    const mockEvents: Event[] = [
      {
        title: 'Team Meeting',
        description: 'Discuss project roadmap',
        typeS: EventStatus.PLANNED,
        startDate: '2025-04-15',
        endDate: '2025-04-15',
        startTime: '09:00',
        endTime: '10:30'
      },
      {
        title: 'Client Call',
        description: 'Quarterly review with client',
        typeS: EventStatus.PLANNED,
        startDate: '2025-04-16',
        endDate: '2025-04-16',
        startTime: '14:00',
        endTime: '15:00'
      }
    ];

    service.getAllEvents().subscribe(events => {
      expect(events.length).toBe(2);
      expect(events).toEqual(mockEvents);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/events');
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents); // simulate backend returning events
  });*/
});
