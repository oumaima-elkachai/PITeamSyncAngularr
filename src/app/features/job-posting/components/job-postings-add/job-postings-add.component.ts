// job-postings-add.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobPostingService } from 'src/app/core/services/job-postings/job-posting.service';
import { JobPosting } from 'src/app/features/job-posting/models/job-posting.model';
import { Router } from '@angular/router';  
@Component({
  selector: 'app-job-postings-add',
  templateUrl: './job-postings-add.component.html'
})
export class JobPostingsAddComponent {
  jobForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  imageUrlPreview: string | null = null;
  imageError: string | null = null;
  selectedFile: File | null = null;
  

  constructor(private fb: FormBuilder, private jobPostingService: JobPostingService,private router: Router ) {
    
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required],
      category: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
      expirationDate: ['', Validators.required],
      status: ['ENABLE', Validators.required]
    });

    
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {  // 1MB max
        this.imageError = 'L’image ne doit pas dépasser 1 Mo.';
        this.selectedFile = null;
        this.imageUrlPreview = null;
        return;
      }
      const allowedExtensions = ['image/jpeg', 'image/png'];
      if (!allowedExtensions.includes(file.type)) {
        this.imageError = 'Veuillez télécharger une image au format JPG, JPEG ou PNG.';
        this.selectedFile = null;
        this.imageUrlPreview = null;
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrlPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.imageError = null;
    }
  }

  addJob(): void {
    if (this.jobForm.invalid || !this.selectedFile) {
      return;
    }

    const jobPosting: JobPosting = this.jobForm.value;

    // Appel au service pour envoyer l'offre d'emploi et l'image
    this.jobPostingService.createJobPosting(jobPosting, this.selectedFile).subscribe(
      (response) => {
        this.successMessage = 'L\'offre d\'emploi a été ajoutée avec succès !';
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Erreur lors de l\'ajout de l\'offre d\'emploi.';
        this.successMessage = '';
      }
    );
  }

  resetForm(): void {
    this.jobForm.reset();
    this.selectedFile = null;
    this.imageUrlPreview = null;
    this.imageError = null;
    this.successMessage = '';
    this.errorMessage = '';
  }

 
  cancel(): void {
    this.router.navigate(['/admin/job-postings']); // Annuler l'ajout et rediriger
  }
}
