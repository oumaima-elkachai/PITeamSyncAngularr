import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingDeadlinesComponent } from './upcoming-deadlines.component';

describe('UpcomingDeadlinesComponent', () => {
  let component: UpcomingDeadlinesComponent;
  let fixture: ComponentFixture<UpcomingDeadlinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingDeadlinesComponent]
    });
    fixture = TestBed.createComponent(UpcomingDeadlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
