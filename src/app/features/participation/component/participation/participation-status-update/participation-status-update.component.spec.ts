import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationStatusUpdateComponent } from './participation-status-update.component';

describe('ParticipationStatusUpdateComponent', () => {
  let component: ParticipationStatusUpdateComponent;
  let fixture: ComponentFixture<ParticipationStatusUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipationStatusUpdateComponent]
    });
    fixture = TestBed.createComponent(ParticipationStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
