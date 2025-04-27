import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPredictionComponent } from './budget-prediction.component';

describe('BudgetPredictionComponent', () => {
  let component: BudgetPredictionComponent;
  let fixture: ComponentFixture<BudgetPredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetPredictionComponent]
    });
    fixture = TestBed.createComponent(BudgetPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
