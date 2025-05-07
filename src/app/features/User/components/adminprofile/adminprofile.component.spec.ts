import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminprofileComponent } from './adminprofile.component';

describe('AdminprofileComponent', () => {
  let component: AdminprofileComponent;
  let fixture: ComponentFixture<AdminprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminprofileComponent]
    });
    fixture = TestBed.createComponent(AdminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
