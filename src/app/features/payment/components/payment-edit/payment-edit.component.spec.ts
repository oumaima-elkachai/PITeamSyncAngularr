import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEditComponent } from './payment-edit.component';

describe('PaymentEditComponent', () => {
  let component: PaymentEditComponent;
  let fixture: ComponentFixture<PaymentEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentEditComponent]
    });
    fixture = TestBed.createComponent(PaymentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
