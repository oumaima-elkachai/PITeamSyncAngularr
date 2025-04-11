import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceListComponent } from './presence-list.component';

describe('PresenceListComponent', () => {
  let component: PresenceListComponent;
  let fixture: ComponentFixture<PresenceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresenceListComponent]
    });
    fixture = TestBed.createComponent(PresenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
