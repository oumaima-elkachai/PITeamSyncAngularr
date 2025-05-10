import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostingService } from 'src/app/core/services/job-postings/job-posting.service';
import { JobPosting } from 'src/app/features/job-posting/models/job-posting.model';

@Component({
  selector: 'app-job-postings-edit',
  templateUrl: './job-postings-edit.component.html',
  styleUrls: ['./job-postings-edit.component.css']
})
export class JobPostingsEditComponent implements OnInit {
  job: JobPosting = { id: '', title: '', description: '', department: '', category: '', applicationIds: [] };
  isLoading = true; // Indicateur de chargement
  errorMessage = ''; // Pour afficher un message d'erreur

  constructor(
    private route: ActivatedRoute,
    private jobPostingService: JobPostingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("ID récupéré depuis l'URL :", id); // Vérification 1
    if (id) {
      this.jobPostingService.getJobById(id).subscribe({
        next: (data) => {
          this.job = data; //remlir l'objet job avec les données récupérées
          this.isLoading = false; // Fin du chargement
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du job:', err);
          this.errorMessage = "Impossible de charger l'offre d'emploi.";
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = "ID de l'offre non trouvé.";
      this.isLoading = false;
      this.router.navigate(['/admin/job-postings']);
    }
  }

  updateJob(): void {
    if (this.job.id) {
      this.jobPostingService.updateJob(this.job.id, this.job).subscribe({
        next: () => {
          alert('Offre mise à jour avec succès.');
          this.router.navigate(['/admin/job-postings']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour:', err);
          this.errorMessage = "Erreur lors de la mise à jour de l'offre.";
        }
      });
    } else {
      console.error("Impossible de mettre à jour l'offre sans un ID valide.");
      this.errorMessage = "ID invalide, mise à jour impossible.";
    }
  }
}
