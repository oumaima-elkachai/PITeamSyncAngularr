import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserprofileComponent } from './edituserprofile.component';

describe('EdituserprofileComponent', () => {
  let component: EdituserprofileComponent;
  let fixture: ComponentFixture<EdituserprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdituserprofileComponent]
    });
    fixture = TestBed.createComponent(EdituserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
