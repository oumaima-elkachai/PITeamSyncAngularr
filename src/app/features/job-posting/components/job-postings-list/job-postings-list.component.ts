import { Component, OnInit } from '@angular/core';
import { JobPostingService } from 'src/app/core/services/job-postings/job-posting.service';
import { JobPosting } from 'src/app/features/job-posting/models/job-posting.model';

@Component({
  selector: 'app-job-postings-list',
  templateUrl: './job-postings-list.component.html',
  styleUrls: ['./job-postings-list.component.css']
})
export class JobPostingsListComponent implements OnInit {
  jobPostings: JobPosting[] = [];
  filteredJobs: any[] = [];  // Liste filtrée des offres
  currentPage: number = 1;
  itemsPerPage: number = 6;  // Tu peux ajuster
  paginatedJobs: JobPosting[] = [];
  totalPages: number = 1;  // Total des pages pour la pagination
  Math = Math;

  constructor(private jobPostingService: JobPostingService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobPostingService.getAllJobs().subscribe(data => {
      this.jobPostings = data;
      this.filteredJobs = data;  // Initialiser la liste filtrée avec toutes les offres
      this.updatePaginatedJobs(); // Initialiser la pagination
      this.calculateTotalPages();  // Calculer le total des pages
    });
  }

  deleteJob(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      this.jobPostingService.deleteJob(id).subscribe(() => {
        this.loadJobs();
      });
    }
  }

  // Getter pour l'URL de l'image
  getImageUrl(imageName?: string): string {
    if (imageName && imageName.trim() !== '') {
      return `http://localhost:8080/api/images/${imageName}`;
    }
    return 'assets/img/default-profile.png'; // Image par défaut si aucune image n'est fournie
  }

  // Fonction pour filtrer les offres en fonction de la recherche
  filterJobs(event: any): void {
    const searchTerm = event.target.value?.toLowerCase() || '';

    this.filteredJobs = this.jobPostings.filter(job =>
      job.title?.toLowerCase().includes(searchTerm) ||
      job.department?.toLowerCase().includes(searchTerm) ||
      job.category?.toLowerCase().includes(searchTerm) ||
      job.description?.toLowerCase().includes(searchTerm) ||
      job.salary?.toString().includes(searchTerm) ||
      job.status?.toLowerCase().includes(searchTerm) ||
      job.applicationIds?.toString().includes(searchTerm)
    );

    this.currentPage = 1; // Réinitialiser la pagination au début
    this.updatePaginatedJobs();
    this.calculateTotalPages();  // Recalculer le total des pages après filtrage
  }

  updatePaginatedJobs(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedJobs = this.filteredJobs.slice(startIndex, endIndex);
  }

  // Fonction pour calculer le nombre total de pages
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredJobs.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedJobs();
  }
}
