import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceFormComponent } from './presence-form.component';

describe('PresenceFormComponent', () => {
  let component: PresenceFormComponent;
  let fixture: ComponentFixture<PresenceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresenceFormComponent]
    });
    fixture = TestBed.createComponent(PresenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
