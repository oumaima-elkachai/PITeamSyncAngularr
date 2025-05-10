import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ParticipationService } from '../../../../../core/services/participation/participation.service';
import { ParticipationStatus } from '../../../models/participation-status.enum';
import { Event } from 'src/app/features/events/models/event.model';
import { Participant } from 'src/app/features/participants/models/participant.model';
import { Participation } from 'src/app/features/participation/models/participation.model';
import { forkJoin, of } from 'rxjs';
import { EventStatistics } from '../../../models/event-statistics.model';
import ApexCharts from 'apexcharts';
import { ToasterService } from '../../../../../core/services/toaster/toaster.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

declare var bootstrap: any; // For Bootstrap modal

interface EventTypeStats {
  [key: string]: number;
}

@Component({
  selector: 'app-participation-list',
  templateUrl: './participation-list.component.html',
  styleUrls: ['./participation-list.component.css']
})
export class ParticipationListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @ViewChild("eventTypePieChart") chartElement!: ElementRef;

  private pieChart: ApexCharts | null = null;
  private barChart: ApexCharts | null = null;
  private _currentView: 'list' | 'stats' = 'list';

  // Add getter/setter for currentView
  get currentView(): 'list' | 'stats' {
    return this._currentView;
  }

  set currentView(value: 'list' | 'stats') {
    this._currentView = value;
    if (value === 'stats') {
      // Initialize charts when switching to stats view
      setTimeout(() => this.initCharts(), 0);
    } else {
      // Cleanup charts when switching away
      this.destroyCharts();
    }
  }

  participations: Participation[] = [];
  allParticipations: Participation[] = [];
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

  sortDirection: 'asc' | 'desc' = 'desc';  // Default to newest first

  searchTerm: string = '';

  // Getter for paginated and sorted participations
  get paginatedParticipations(): Participation[] {
    const sorted = [...this.participations].sort((a, b) => {
      // First sort by pending status
      if (a.participationS === ParticipationStatus.PENDING && b.participationS !== ParticipationStatus.PENDING) return -1;
      if (b.participationS === ParticipationStatus.PENDING && a.participationS !== ParticipationStatus.PENDING) return 1;
      
      // Then sort by date
      const dateA = new Date(a.participationDate).getTime();
      const dateB = new Date(b.participationDate).getTime();
      return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

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

  toggleSort(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  constructor(
    private participationService: ParticipationService,
    private toasterService: ToasterService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadParticipations();
    this.statisticsModal = new bootstrap.Modal(document.getElementById('statisticsModal'));
  }

  ngAfterViewInit() {
    this.initCharts();
  }

  private calculateEventTypeStats(): EventTypeStats {
    const stats: EventTypeStats = {};
    
    this.participations.forEach(participation => {
      // Get event type from the event or use a default category
      const eventType = participation.eventType || 'Uncategorized';
      stats[eventType] = (stats[eventType] || 0) + 1;
    });

    return stats;
  }

  private initCharts(): void {
    if (!this.chartElement?.nativeElement) return;

    // Calculate statistics
    const stats = this.calculateEventTypeStats();
    const total = Object.values(stats).reduce((a, b) => a + b, 0);

    // Convert to series and labels
    const series = [];
    const labels = [];
    
    for (const [type, count] of Object.entries(stats)) {
      series.push(Math.round((count / total) * 100));
      labels.push(type);
    }

    // Cleanup existing chart if any
    if (this.pieChart) {
      this.pieChart.destroy();
    }

    const pieOptions = {
      series: series,
      chart: {
        height: 228,
        type: "pie",
      },
      labels: labels,
      colors: ['#924AEF', '#5ECFFF', '#E328AF', '#FF9325', '#FF4A55', '#DFEDF2'],
      tooltip: {
        y: {
          formatter: (val: number) => `${val}%`
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    this.pieChart = new ApexCharts(
      this.chartElement.nativeElement,
      pieOptions
    );
    this.pieChart.render();
  }

  private destroyCharts(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
      this.pieChart = null;
    }
  }

  loadParticipations(): void {
    this.loading = true;
    this.error = null;

    this.participationService.getAllParticipations()
      .subscribe({
        next: (participations) => {
          const detailsRequests = participations.map(participation => {
            return forkJoin({
              participation: of(participation),
              eventTitle: this.participationService.getEventTitle(participation.eventId),
              participantEmail: this.participationService.getParticipantEmail(participation.participantId)
            });
          });

          if (detailsRequests.length === 0) {
            this.participations = [];
            this.allParticipations = [];
            this.loading = false;
            return;
          }

          forkJoin(detailsRequests).subscribe({
            next: (results) => {
              this.participations = results.map(result => ({
                ...result.participation,
                eventTitle: result.eventTitle,
                participantEmail: result.participantEmail
              }));
              this.allParticipations = [...this.participations];
              this.loading = false;
              this.onParticipationsUpdate();
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

  searchCriteria(searchValue: string) {
    const value = searchValue.toLowerCase();
    this.participations = this.allParticipations.filter(participation => 
        participation.eventTitle?.toLowerCase().includes(value) || 
        participation.participantEmail?.toLowerCase().includes(value)
    );
    this.updatePagination();
  }

  onSearchChange(value: string) {
    this.participations = this.allParticipations.filter(item => 
        item.eventTitle?.toLowerCase().includes(value.toLowerCase()) ||
        item.participantEmail?.toLowerCase().includes(value.toLowerCase())
    );
    this.updatePagination();
  }

  showStatistics(participation: Participation): void {
    this.selectedParticipation = participation;
    this.participationService.getEventStatistics(participation.eventId)
      .subscribe({
        next: (stats) => {
          this.eventStats = stats;
          this.statisticsModal.show();
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
        this.onParticipationsUpdate();
      },
      error: (error) => {
        this.error = 'Error loading participation details';
        this.loading = false;
      }
    });
  }

  updateStatus(id: string, status: ParticipationStatus): void {
    console.log(`Attempting to update participation ${id} to status ${status}`);
    
    this.participationService.updateStatus(id, status).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        // Refresh the list after successful update
        this.loadParticipations();
        
        // Show success message
        this.toasterService.success('Participation status updated successfully');
      },
      error: (error) => {
        console.error('Update failed:', error);
        this.toasterService.error(error.message || 'Failed to update participation status');
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
        next: (data: Participation[]) => {
          this.participations = data;
          this.loading = false;
          this.onParticipationsUpdate();
        },
        error: (error: any) => {
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
          this.onParticipationsUpdate();
        },
        error: (error) => {
          this.error = 'Error filtering by event';
          this.loading = false;
        }
      });
  }

  private initializeChart(): void {
    if (this.barChart) {
      this.barChart.destroy();
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

    setTimeout(() => {
      this.barChart = new ApexCharts(document.querySelector("#participationChart"), chartOptions);
      this.barChart.render();
    }, 0);
  }

  onParticipationsUpdate() {
    if (this.currentView === 'stats') {
      setTimeout(() => this.initCharts(), 0);
    }
  }

  updatePagination(): void {
    this.totalItems = this.participations.length;
    this.currentPage = 1;
  }

  ngOnDestroy() {
    this.destroyCharts();
    if (this.barChart) {
      this.barChart.destroy();
    }
  }

  onConfirm(participationId: string): void {
    this.loading = true;
    this.participationService.confirmParticipation(participationId)
      .subscribe({
        next: () => {
          this.loading = false;
          this.toasterService.success('Participation confirmed successfully. Confirmation email has been sent.');
          this.loadParticipations(); // Refresh the list
        },
        error: (error) => {
          this.loading = false;
          this.toasterService.error(error.message || 'Failed to confirm participation');
          console.error('Error confirming participation:', error);
        }
      });
  }
}
