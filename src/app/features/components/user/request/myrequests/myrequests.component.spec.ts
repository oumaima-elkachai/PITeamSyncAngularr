import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrequestsComponent } from './myrequests.component';

describe('MyrequestsComponent', () => {
  let component: MyrequestsComponent;
  let fixture: ComponentFixture<MyrequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyrequestsComponent]
    });
    fixture = TestBed.createComponent(MyrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
