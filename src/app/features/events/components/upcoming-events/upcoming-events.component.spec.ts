import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingEventsComponent } from './upcoming-events.component';

describe('UpcomingEventsComponent', () => {
  let component: UpcomingEventsComponent;
  let fixture: ComponentFixture<UpcomingEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingEventsComponent]
    });
    fixture = TestBed.createComponent(UpcomingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
