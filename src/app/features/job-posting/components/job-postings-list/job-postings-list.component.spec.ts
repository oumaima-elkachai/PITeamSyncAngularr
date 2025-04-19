import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingsListComponent } from './job-postings-list.component';

describe('JobPostingsListComponent', () => {
  let component: JobPostingsListComponent;
  let fixture: ComponentFixture<JobPostingsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobPostingsListComponent]
    });
    fixture = TestBed.createComponent(JobPostingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
