import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingsUserComponent } from './job-postings-user.component';

describe('JobPostingsUserComponent', () => {
  let component: JobPostingsUserComponent;
  let fixture: ComponentFixture<JobPostingsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobPostingsUserComponent]
    });
    fixture = TestBed.createComponent(JobPostingsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
