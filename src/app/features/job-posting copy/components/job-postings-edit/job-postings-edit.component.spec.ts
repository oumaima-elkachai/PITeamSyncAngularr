import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingsEditComponent } from './job-postings-edit.component';

describe('JobPostingsEditComponent', () => {
  let component: JobPostingsEditComponent;
  let fixture: ComponentFixture<JobPostingsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobPostingsEditComponent]
    });
    fixture = TestBed.createComponent(JobPostingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
