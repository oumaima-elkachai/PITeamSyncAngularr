import { Component } from '@angular/core';
import { JobPostingService } from 'src/app/core/services/job-postings/job-posting.service';
import { Router } from '@angular/router';
import { JobPosting } from 'src/app/features/job-posting/models/job-posting.model';

@Component({
  selector: 'app-job-postings-add',
  templateUrl: './job-postings-add.component.html',
  styleUrls: ['./job-postings-add.component.css']
})
export class JobPostingsAddComponent {
  job: JobPosting = {  title: '', description: '', department: '', category: '', applicationIds: [] };

  constructor(private jobPostingService: JobPostingService, private router: Router) {}

  // Méthode pour ajouter une nouvelle offre
  addJob(): void {
    this.jobPostingService.addJob(this.job).subscribe({
      next: (response) => {
        console.log('Offre ajoutée avec succès', response);
        this.router.navigate(['/admin/job-postings']); // Redirige vers la liste des offres
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de l\'offre', err);
      }
    });
  }

  // Méthode pour annuler (optionnel)
  cancel(): void {
    this.router.navigate(['/admin/job-postings']);
  }
}
