import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollDeleteComponent } from './payroll-delete.component';

describe('PayrollDeleteComponent', () => {
  let component: PayrollDeleteComponent;
  let fixture: ComponentFixture<PayrollDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollDeleteComponent]
    });
    fixture = TestBed.createComponent(PayrollDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
