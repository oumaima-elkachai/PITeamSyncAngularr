import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateComponent } from './candidate.component';

describe('CandidateComponent', () => {
  let component: CandidateComponent;
  let fixture: ComponentFixture<CandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateComponent]
    });
    fixture = TestBed.createComponent(CandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
