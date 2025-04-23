import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobQuizComponent } from './jobquiz.component';

describe('JobquizComponent', () => {
  let component: JobQuizComponent;
  let fixture: ComponentFixture<JobQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobQuizComponent]
    });
    fixture = TestBed.createComponent(JobQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
