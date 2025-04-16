import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingsAddComponent } from './job-postings-add.component';

describe('JobPostingsAddComponent', () => {
  let component: JobPostingsAddComponent;
  let fixture: ComponentFixture<JobPostingsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobPostingsAddComponent]
    });
    fixture = TestBed.createComponent(JobPostingsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
