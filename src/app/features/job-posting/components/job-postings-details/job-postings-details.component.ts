import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPostingService } from 'src/app/core/services/job-postings/job-posting.service';
import { JobPosting } from 'src/app/features/job-posting/models/job-posting.model';
import { ApplicationService } from 'src/app/core/services/job-apply/application.service';
import { Application } from 'src/app/features/application/models/application.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-postings-details',
  templateUrl: './job-postings-details.component.html',
})
export class JobPostingsDetailsComponent implements OnInit {
  job!: JobPosting;
  jobId: string = '';
  applications: Application[] = [];
  activeTab: 'description' | 'details' | 'applications' = 'description';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobPostingService,
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const jobIdParam = this.route.snapshot.paramMap.get('id');
    if (jobIdParam) {
      this.jobId = jobIdParam;  // Assurez-vous qu'il s'agit d'une chaîne valide
      this.jobService.getJobById(this.jobId).subscribe((data: JobPosting) => {
        this.job = data;
        this.loadApplications();
      });
    } else {
      this.jobId = '';  // Définir une chaîne vide si l'ID est absent
      console.error('Job ID non fourni dans l\'URL');
    }
  }
  

  loadApplications(): void {
    this.applicationService.getApplicationsByJob(this.jobId).subscribe((apps) => {
      console.log(apps);  // Vérifie ici la structure des données
      this.applications = apps;
    });
  }

  updateStatus(appId: string, newStatus: string): void {
    this.applicationService.updateApplicationStatus(appId, newStatus).subscribe(() => {
      alert(`✅ Statut mis à jour en ${newStatus}`);
      this.loadApplications(); // recharge les candidatures
    });
  }

  deleteApplication(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      this.applicationService.deleteApplication(id).subscribe({
        next: () => {
          this.successMessage = 'Candidature supprimée avec succès.';
          
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/admin/applications']);
          }, 2000);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
    
  }



  getStatusBadgeClass(status: string | undefined): string {
    switch (status) {
      case 'PENDING':
        return 'badge text-bg-info mb-1';
      
      case 'ACCEPTED':
        return 'badge text-bg-success mb-1';
      case 'REJECTED':
        return 'badge text-bg-danger mb-1';
      default:
        return 'bg-secondary-subtle text-dark';
    }
  }
  





  changeTab(tab: 'description' | 'details' | 'applications'): void {
    this.activeTab = tab;
  }
}

  // Méthode pour changer l'onglet actif
