import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventsAddComponent } from './events-add.component';
import { EventStatus } from '../../models/event-status.enum';
import { Event } from '../../models/event.model';

describe('EventsAddComponent', () => {
  let component: EventsAddComponent;
  let fixture: ComponentFixture<EventsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsAddComponent ],
      imports: [ ReactiveFormsModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.eventForm.valid).toBeFalsy();
  });

  it('title field validity', () => {
    const title = component.eventForm.controls['title'];
    expect(title.valid).toBeFalsy();

    title.setValue("");
    expect(title.hasError('required')).toBeTruthy();

    title.setValue("ab");
    expect(title.hasError('minlength')).toBeTruthy();

    title.setValue("Valid Title");
    expect(title.valid).toBeTruthy();
  });

  it('date time validation', () => {
    const form = component.eventForm;
    
    form.controls['startDate'].setValue('2024-01-01');
    form.controls['endDate'].setValue('2024-01-01');
    form.controls['startTime'].setValue('10:00');
    form.controls['endTime'].setValue('09:00');

    expect(form.hasError('dateTimeInvalid')).toBeTruthy();

    form.controls['endTime'].setValue('11:00');
    expect(form.hasError('dateTimeInvalid')).toBeFalsy();
  });

  it('should validate past dates', () => {
    const startDate = component.eventForm.controls['startDate'];
    
    // Set past date
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    startDate.setValue(pastDate.toISOString().split('T')[0]);
    expect(startDate.hasError('pastDate')).toBeTruthy();
    
    // Set current date
    const today = new Date().toISOString().split('T')[0];
    startDate.setValue(today);
    expect(startDate.valid).toBeTruthy();
    
    // Set future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    startDate.setValue(futureDate.toISOString().split('T')[0]);
    expect(startDate.valid).toBeTruthy();
  });

  it('should initialize with current date and time', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(component.eventForm.get('startDate')?.value).toBe(today);
    expect(component.eventForm.get('endDate')?.value).toBe(today);
  });

  it('submit button should be disabled when form is invalid', () => {
    component.submitted = true;
    fixture.detectChanges();
    
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    expect(component.eventForm.valid).toBeFalsy();
    
    // Fill in valid form data
    component.eventForm.controls['title'].setValue('Test Event');
    component.eventForm.controls['startDate'].setValue('2024-01-01');
    component.eventForm.controls['endDate'].setValue('2024-01-01');
    component.eventForm.controls['startTime'].setValue('10:00');
    component.eventForm.controls['endTime'].setValue('11:00');
    component.eventForm.controls['typeS'].setValue('Pending');
    component.eventForm.controls['description'].setValue('Test description text');
    
    fixture.detectChanges();
    expect(component.eventForm.valid).toBeTruthy();
  });

  it('should emit event on valid form submission', () => {
    const expectedEvent: Event = {
      title: 'Test Event',
      startDate: '2024-01-01',
      endDate: '2024-01-01',
      startTime: '10:00',
      endTime: '11:00',
      typeS: EventStatus['PLANNED'],  
      description: 'Test description text'
    };

    spyOn(component.eventAdded, 'emit');
    
    component.eventForm.patchValue({
      title: 'Test Event',
      startDate: '2024-01-01',
      endDate: '2024-01-01',
      startTime: '10:00',
      endTime: '11:00',
      typeS: EventStatus,
      description: 'Test description text'
    });

    component.onSubmit();
    
    expect(component.eventAdded.emit).toHaveBeenCalledWith(expectedEvent);
  });
});
