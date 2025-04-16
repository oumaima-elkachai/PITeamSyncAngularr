import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/core/services/job-apply/application.service';
import { Application } from 'src/app/features/application/models/application.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {
  application!: Application;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const applicationId: string | null = this.route.snapshot.paramMap.get('id');

    if (applicationId) {
      this.applicationService.getApplicationById(applicationId).subscribe({
        next: (data) => {
          this.application = data;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erreur lors du chargement de la candidature :', err);
        }
      });
    } else {
      console.error('ID de candidature manquant dans l’URL.');
    }
  }

  updateStatus(status: string): void {
    const applicationId: string | null = this.route.snapshot.paramMap.get('id');

    if (!applicationId) {
      console.error('ID de candidature introuvable.');
      return;
    }

    this.applicationService.updateApplicationStatus(applicationId, status).subscribe({
      next: (response) => {
        console.log('Statut mis à jour avec succès :', response);
        this.application.status = status; // Mise à jour dans le template aussi
        alert(`Statut mis à jour en ${status}`);
        this.router.navigate(['/admin/job-postings']); // Redirection après mise à jour
  
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur lors de la mise à jour du statut :', error);
      }
    });
  }

  successMessage: string = '';
  deleteApplication(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      this.applicationService.deleteApplication(id).subscribe({
        next: () => {
          this.successMessage = 'Candidature supprimée avec succès.';
          // Optionnel : redirection après 2 secondes
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
  
  

}
