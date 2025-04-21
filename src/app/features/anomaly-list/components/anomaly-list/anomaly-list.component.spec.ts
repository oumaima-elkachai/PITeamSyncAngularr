import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyListComponent } from './anomaly-list.component';

describe('AnomalyListComponent', () => {
  let component: AnomalyListComponent;
  let fixture: ComponentFixture<AnomalyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnomalyListComponent]
    });
    fixture = TestBed.createComponent(AnomalyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
