import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CombinedViewComponent } from './combined-view/combined-view.component';
import { EventsModule } from '../events/events.module';
import { RecommendationModule } from '../recommendation/recommendation.module';

@NgModule({
  declarations: [
    CombinedViewComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    EventsModule,
    RecommendationModule
  ],
  exports: [
    CombinedViewComponent
  ]
})
export class CombinedViewFrontModule { }
