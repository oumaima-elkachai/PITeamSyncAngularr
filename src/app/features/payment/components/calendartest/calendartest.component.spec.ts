import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendartestComponent } from './calendartest.component';

describe('CalendartestComponent', () => {
  let component: CalendartestComponent;
  let fixture: ComponentFixture<CalendartestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendartestComponent]
    });
    fixture = TestBed.createComponent(CalendartestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
