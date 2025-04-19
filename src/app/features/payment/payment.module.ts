import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentAddComponent } from './components/payment-add/payment-add.component';
import { PaymentEditComponent } from './components/payment-edit/payment-edit.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // Ajout de l'importation de module



@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentAddComponent,
    PaymentEditComponent,
    PaymentDetailComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FullCalendarModule,

    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentModule { }
