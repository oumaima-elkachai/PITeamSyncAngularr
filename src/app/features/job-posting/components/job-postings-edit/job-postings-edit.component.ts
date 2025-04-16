import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostingService } from 'src/app/core/services/job-postings/job-posting.service';
import { JobPosting } from 'src/app/features/job-posting/models/job-posting.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-postings-edit',
  templateUrl: './job-postings-edit.component.html',
  styleUrls: ['./job-postings-edit.component.css']
})
export class JobPostingsEditComponent implements OnInit {
  job: JobPosting = {
    id: '', title: '', description: '', department: '', category: '', status: 'active',
    salary: 0, datePosted: new Date(), expirationDate: new Date(),
    imageUrl: '', applicationIds: []
  };

  selectedFile?: File;
  imageUrlPreview: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private jobPostingService: JobPostingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jobPostingService.getJobById(id).subscribe(
        (data) => {
          this.job = data;
          this.imageUrlPreview = this.job.imageUrl ? `http://localhost:8080${this.job.imageUrl}` : null;
        },
        (error) => {
          console.error('Erreur lors de la récupération du job :', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.imageUrlPreview = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(file: File): Observable<any> {
    return this.jobPostingService.uploadImage(file);
  }

  updateJob(): void {
    // Si un fichier est sélectionné, on appelle updateJob avec le fichier et le JobPosting
    if (this.selectedFile) {
      this.jobPostingService.updateJob(this.job.id!, this.job, this.selectedFile).subscribe({
        next: (response) => {
          alert('Mise à jour réussie !');
          this.router.navigate(['/admin/job-postings']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
        }
      });
    } else {
      // Si aucun fichier n'est sélectionné, on appelle updateJob sans fichier
      this.jobPostingService.updateJob(this.job.id!, this.job).subscribe({
        next: (response) => {
          alert('Mise à jour réussie !');
          this.router.navigate(['/admin/job-postings']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
        }
      });
    }
  }
  
  

  submitUpdatedJob(): void {
    this.jobPostingService.updateJob(this.job.id!, this.job).subscribe(
      () => {
        alert('Mise à jour réussie !');
        this.router.navigate(['/admin/job-postings']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour :', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/admin/job-postings']);
  }
}
