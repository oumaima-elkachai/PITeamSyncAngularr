import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPresenceComponent } from './add-presence.component';

describe('AddPresenceComponent', () => {
  let component: AddPresenceComponent;
  let fixture: ComponentFixture<AddPresenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPresenceComponent]
    });
    fixture = TestBed.createComponent(AddPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
