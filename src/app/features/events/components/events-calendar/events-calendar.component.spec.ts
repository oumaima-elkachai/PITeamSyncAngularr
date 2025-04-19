import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCalendarComponent } from './events-calendar.component';

describe('EventsCalendarComponent', () => {
  let component: EventsCalendarComponent;
  let fixture: ComponentFixture<EventsCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsCalendarComponent]
    });
    fixture = TestBed.createComponent(EventsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
