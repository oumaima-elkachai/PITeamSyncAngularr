import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsEditComponent } from './events-edit.component';

describe('EventsEditComponent', () => {
  let component: EventsEditComponent;
  let fixture: ComponentFixture<EventsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsEditComponent]
    });
    fixture = TestBed.createComponent(EventsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
