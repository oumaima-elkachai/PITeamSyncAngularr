import { Component, OnInit } from '@angular/core';
import { JobPostingService } from 'src/app/core/services/job-postings/job-posting.service';
import { JobPosting } from 'src/app/features/job-posting/models/job-posting.model';

@Component({
  selector: 'app-job-postings-user',
  templateUrl: './job-postings-user.component.html',
  styleUrls: ['./job-postings-user.component.css']
})
export class JobPostingsUserComponent implements OnInit {

  jobList: JobPosting[] = [];
  paginatedJobs: JobPosting[] = [];

  // Pagination
  pageSize: number = 6;
  currentPage: number = 1;

  constructor(private jobService: JobPostingService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (jobs: JobPosting[]) => {
        this.jobList = jobs;
        
        this.paginateJobs(); // Appelle la pagination après avoir récupéré les jobs
        
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des offres :', error);
      }
    });
  }

  paginateJobs(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedJobs = this.jobList.slice(startIndex, endIndex);
    
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return; // Pour éviter des erreurs de page
    this.currentPage = page;
    this.paginateJobs();
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.jobList.length / this.pageSize);
  }

  // Crée un tableau avec les indices des pages pour la pagination
  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }


  
}
