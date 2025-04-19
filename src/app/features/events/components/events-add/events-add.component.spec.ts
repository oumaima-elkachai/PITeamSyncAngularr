import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAddComponent } from './events-add.component';

describe('EventsAddComponent', () => {
  let component: EventsAddComponent;
  let fixture: ComponentFixture<EventsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsAddComponent]
    });
    fixture = TestBed.createComponent(EventsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
