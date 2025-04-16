import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsUserComponent } from './job-details-user.component';

describe('JobDetailsUserComponent', () => {
  let component: JobDetailsUserComponent;
  let fixture: ComponentFixture<JobDetailsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobDetailsUserComponent]
    });
    fixture = TestBed.createComponent(JobDetailsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
