import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadminprofileComponent } from './editadminprofile.component';

describe('EditadminprofileComponent', () => {
  let component: EditadminprofileComponent;
  let fixture: ComponentFixture<EditadminprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditadminprofileComponent]
    });
    fixture = TestBed.createComponent(EditadminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
