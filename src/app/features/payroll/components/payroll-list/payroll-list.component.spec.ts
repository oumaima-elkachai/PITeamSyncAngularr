import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollListComponent } from './payroll-list.component';

describe('PayrollListComponent', () => {
  let component: PayrollListComponent;
  let fixture: ComponentFixture<PayrollListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollListComponent]
    });
    fixture = TestBed.createComponent(PayrollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
