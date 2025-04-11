import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestadminComponent } from './requestadmin.component';

describe('RequestadminComponent', () => {
  let component: RequestadminComponent;
  let fixture: ComponentFixture<RequestadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestadminComponent]
    });
    fixture = TestBed.createComponent(RequestadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
