import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogDetailsComponent } from './audit-log-details.component';

describe('AuditLogDetailsComponent', () => {
  let component: AuditLogDetailsComponent;
  let fixture: ComponentFixture<AuditLogDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditLogDetailsComponent]
    });
    fixture = TestBed.createComponent(AuditLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
