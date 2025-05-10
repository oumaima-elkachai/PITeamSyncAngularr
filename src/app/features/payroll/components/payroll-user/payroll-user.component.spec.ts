import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollUserComponent } from './payroll-user.component';

describe('PayrollUserComponent', () => {
  let component: PayrollUserComponent;
  let fixture: ComponentFixture<PayrollUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollUserComponent]
    });
    fixture = TestBed.createComponent(PayrollUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
