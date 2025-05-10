import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { RecommendationService } from 'src/app/core/services/recommendation/recommendation.service';
import { RecommendationResponse } from 'src/app/features/recommendation/interfaces/recommendation.interface';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationsComponent implements OnInit, AfterViewInit {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;
  
  recommendations: any[] = [];
  participationPattern?: any;
  isLeftEnd = true;
  isRightEnd = false;
  private scrollAmount = 600;

  constructor(
    private recommendationService: RecommendationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  ngAfterViewInit(): void {
    // Wrap in setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.checkScrollEnds();
      this.cdr.detectChanges();
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScrollEnds();
    this.cdr.detectChanges();
  }

  loadRecommendations(): void {
    const participantId = 'current-user-id';
    
    this.recommendationService.getRecommendations(participantId).subscribe({
      next: (data: RecommendationResponse) => {
        this.recommendations = data.recommendations || [];
        this.participationPattern = data.participation_pattern;
        
        // Wrap in setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.checkScrollEnds();
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('Error loading recommendations:', error);
      }
    });
  }

  slideLeft(): void {
    if (!this.isLeftEnd) {
      const container = this.cardsContainer.nativeElement;
      container.scrollLeft -= this.scrollAmount;
      
      // Wrap in setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.checkScrollEnds();
        this.cdr.detectChanges();
      });
    }
  }

  slideRight(): void {
    if (!this.isRightEnd) {
      const container = this.cardsContainer.nativeElement;
      container.scrollLeft += this.scrollAmount;
      
      // Wrap in setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.checkScrollEnds();
        this.cdr.detectChanges();
      });
    }
  }

  handleImageError(event: any) {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNlMGUwZTAiIGQ9Ik0yMSAxOVY1YzAtMS4xLS45LTItMi0ySDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJ6TTguNSAxMy41bDIuNSAzLjAxTDE0LjUgMTJsNC41IDZINWwzLjUtNC41eiIvPjwvc3ZnPg==';
  }

  private checkScrollEnds(): void {
    const container = this.cardsContainer.nativeElement;
    this.isLeftEnd = container.scrollLeft <= 0;
    this.isRightEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
  }
}

