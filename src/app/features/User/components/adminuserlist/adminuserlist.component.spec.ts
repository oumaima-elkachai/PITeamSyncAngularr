import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserlistComponent } from './adminuserlist.component';

describe('AdminuserlistComponent', () => {
  let component: AdminuserlistComponent;
  let fixture: ComponentFixture<AdminuserlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminuserlistComponent]
    });
    fixture = TestBed.createComponent(AdminuserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
