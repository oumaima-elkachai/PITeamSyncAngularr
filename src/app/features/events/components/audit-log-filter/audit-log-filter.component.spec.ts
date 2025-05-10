import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogFilterComponent } from './audit-log-filter.component';

describe('AuditLogFilterComponent', () => {
  let component: AuditLogFilterComponent;
  let fixture: ComponentFixture<AuditLogFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditLogFilterComponent]
    });
    fixture = TestBed.createComponent(AuditLogFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
