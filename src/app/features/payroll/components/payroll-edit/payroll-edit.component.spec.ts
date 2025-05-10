import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEditComponent } from './payroll-edit.component';

describe('PayrollEditComponent', () => {
  let component: PayrollEditComponent;
  let fixture: ComponentFixture<PayrollEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollEditComponent]
    });
    fixture = TestBed.createComponent(PayrollEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
