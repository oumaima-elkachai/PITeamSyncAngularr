import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingsDetailsComponent } from './job-postings-details.component';

describe('JobPostingsDetailsComponent', () => {
  let component: JobPostingsDetailsComponent;
  let fixture: ComponentFixture<JobPostingsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobPostingsDetailsComponent]
    });
    fixture = TestBed.createComponent(JobPostingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
