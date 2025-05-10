import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { RecommendationsComponent } from './components/recommendation/recommendation.component';

@NgModule({
  declarations: [
    RecommendationsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    RecommendationsComponent
  ]
})
export class RecommendationModule { }
