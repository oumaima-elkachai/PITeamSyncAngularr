import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ParticipationService } from '../../../../../core/services/participation/participation.service';
import { ParticipationStatus } from '../../../models/participation-status.enum';
import { Event } from 'src/app/features/events/models/event.model';
import{Participant} from 'src/app/features/participants/models/participant.model';
import { Participation } from 'src/app/features/participation/models/participation.model';
import { forkJoin } from 'rxjs';
import { EventStatistics } from '../../../models/event-statistics.model';
import * as ApexCharts from 'apexcharts';
declare var bootstrap: any; // For Bootstrap modal

@Component({
  selector: 'app-participation-list',
  templateUrl: './participation-list.component.html',
  styleUrls: ['./participation-list.component.css']
})
export class ParticipationListComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  private chart: any;
  
  currentView: 'list' | 'stats' = 'list';  // Add this line
  participations: Participation[] = [];
  loading = false;
  error: string | null = null;
  ParticipationStatus = ParticipationStatus;
  selectedParticipation: Participation | null = null;
  eventStats: EventStatistics | null = null;
  private statisticsModal: any;

  // Pagination properties
  pageSize = 5;
  currentPage = 1;
  totalItems = 0;
  
  // Getter for paginated and sorted participations
  get paginatedParticipations(): Participation[] {
    // First sort by status (pending first)
    const sorted = [...this.participations].sort((a, b) => {
      if (a.participationS === ParticipationStatus.PENDING) return -1;
      if (b.participationS === ParticipationStatus.PENDING) return 1;
      return 0;
    });

    // Then paginate
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.totalItems = sorted.length;
    return sorted.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  constructor(private participationService: ParticipationService) { }

  ngOnInit(): void {
    this.loadParticipations();
    this.statisticsModal = new bootstrap.Modal(document.getElementById('statisticsModal'));
  }

  loadParticipations(): void {
    this.loading = true;
    
    this.participationService.getAllParticipations()  // Changed from getParticipationsByEvent
      .subscribe({
        next: (participations) => {
          const detailsRequests = participations.map(participation => {
            return forkJoin({
              participation: Promise.resolve(participation),
              eventTitle: this.participationService.getEventTitle(participation.eventId),
              participantEmail: this.participationService.getParticipantEmail(participation.participantId)
            });
          });

          forkJoin(detailsRequests).subscribe({
            next: (results) => {
              this.participations = results.map(result => ({
                ...result.participation,
                eventTitle: result.eventTitle,
                participantEmail: result.participantEmail
              }));
              this.loading = false;
            },
            error: (error) => {
              console.error('Error loading details:', error);
              this.error = 'Error loading participation details';
              this.loading = false;
            }
          });
        },
        error: (error) => {
          console.error('Error loading participations:', error);
          this.error = 'Error loading participations';
          this.loading = false;
        }
      });
  }

  filterByEventTitle(title: string): void {
    if (!title.trim()) {
      this.loadParticipations();
      return;
    }
    this.loading = true;
    this.participationService.getParticipationsByEventTitle(title)
      .subscribe({
        next: (participations) => {
          // Reuse existing detail loading logic
          this.loadParticipationDetails(participations);
        },
        error: (error) => {
          this.error = 'Error filtering by event title';
          this.loading = false;
        }
      });
  }

  filterByParticipantEmail(email: string): void {
    if (!email.trim()) {
      this.loadParticipations();
      return;
    }
    this.loading = true;
    this.participationService.getParticipationsByParticipantEmail(email)
      .subscribe({
        next: (participations) => {
          this.loadParticipationDetails(participations);
        },
        error: (error) => {
          this.error = 'Error filtering by participant email';
          this.loading = false;
        }
      });
  }

  showStatistics(participation: Participation): void {
    this.selectedParticipation = participation;
    this.participationService.getEventStatistics(participation.eventId)
      .subscribe({
        next: (stats) => {
          this.eventStats = stats;
          this.statisticsModal.show();
          // Initialize chart after modal is shown
          setTimeout(() => this.initializeChart(), 300);
        },
        error: (error) => {
          this.error = 'Error loading event statistics';
        }
      });
  }

  private loadParticipationDetails(participations: Participation[]): void {
    const detailsRequests = participations.map(participation => {
      return forkJoin({
        participation: Promise.resolve(participation),
        eventTitle: this.participationService.getEventTitle(participation.eventId),
        participantEmail: this.participationService.getParticipantEmail(participation.participantId)
      });
    });

    forkJoin(detailsRequests).subscribe({
      next: (results) => {
        this.participations = results.map(result => ({
          ...result.participation,
          eventTitle: result.eventTitle,
          participantEmail: result.participantEmail
        }));
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading participation details';
        this.loading = false;
      }
    });
  }

  updateStatus(id: string, status: ParticipationStatus): void {
    this.loading = true;
    this.participationService.updateParticipationStatus(id, status)
      .subscribe({
        next: () => {
          this.loadParticipations(); // Reload after update
        },
        error: (error) => {
          console.error('Error updating status:', error);
          this.error = 'Error updating participation status';
          this.loading = false;
        }
      });
  }

  filterByParticipant(participantId: string): void {
    if (!participantId.trim()) {
      this.loadParticipations();
      return;
    }
    this.loading = true;
    this.participationService.getParticipationsByParticipant(participantId)
      .subscribe({
        next: (data: Participation[]) => { // Specify type for data
          this.participations = data;
          this.loading = false;
        },
        error: (error: any) => { // Specify type for error
          this.error = 'Error filtering by participant';
          this.loading = false;
        }
      });
  }

  filterByEvent(eventId: string): void {
    if (!eventId.trim()) {
      this.loadParticipations();
      return;
    }
    this.loading = true;
    this.participationService.getParticipationsByEvent(eventId)
      .subscribe({
        next: (data) => {
          this.participations = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error filtering by event';
          this.loading = false;
        }
      });
  }

  private initializeChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    interface ChartOptions {
      series: number[];
      chart: {
      type: string;
      height: number;
      };
      labels: string[];
      colors: string[];
      plotOptions: {
      pie: {
        donut: {
        size: string;
        labels: {
          show: boolean;
          total: {
          show: boolean;
          label: string;
          formatter: (w: { globals: { seriesTotals: number[] } }) => number;
          };
        };
        };
      };
      };
      dataLabels: {
      enabled: boolean;
      };
      legend: {
      position: string;
      horizontalAlign: string;
      };
      responsive: Array<{
      breakpoint: number;
      options: {
        chart: {
        height: number;
        };
      };
      }>;
    }

    const chartOptions: ChartOptions = {
      series: [
      this.eventStats?.confirmed || 0,
      this.eventStats?.pending || 0,
      this.eventStats?.cancelled || 0,
      this.eventStats?.waitlisted || 0
      ],
      chart: {
      type: 'donut',
      height: 380
      },
      labels: ['Confirmed', 'Pending', 'Cancelled', 'Waitlisted'],
      colors: ['#28a745', '#ffc107', '#dc3545', '#6c757d'],
      plotOptions: {
      pie: {
        donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
          show: true,
          label: 'Total',
          formatter: function(w: { globals: { seriesTotals: number[] } }): number {
            return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
          }
          }
        }
        }
      }
      },
      dataLabels: {
      enabled: true
      },
      legend: {
      position: 'bottom',
      horizontalAlign: 'center'
      },
      responsive: [{
      breakpoint: 480,
      options: {
        chart: {
        height: 300
        }
      }
      }]
    };

    // Create chart with delay to ensure container is ready
    setTimeout(() => {
      this.chart = new ApexCharts(document.querySelector("#participationChart"), chartOptions);
      this.chart.render();
    }, 0);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
