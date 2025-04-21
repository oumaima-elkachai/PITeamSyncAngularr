import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChartsComponent } from './payment-charts.component';

describe('PaymentChartsComponent', () => {
  let component: PaymentChartsComponent;
  let fixture: ComponentFixture<PaymentChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentChartsComponent]
    });
    fixture = TestBed.createComponent(PaymentChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
