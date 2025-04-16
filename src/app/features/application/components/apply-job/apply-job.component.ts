import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/core/services/job-apply/application.service';
import { JobPostingService } from 'src/app/core/services/job-postings/job-posting.service';
import { CandidateService } from 'src/app/core/services/candidate/candidate.service';
import { Application } from '../../models/application.model';
import { Candidate } from 'src/app/features/candidate/models/candidate.model';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {
  application: Application = {
    jobId: '',
    jobTitle: '',
    candidateName: '',
    candidateEmail: '',
    status: 'PENDING',
    candidateId: '',
    cvUrl: '',
    experience:0,
    candidatePhone: 0,
    candidatePortfolio: '',
    candidateLinkedIn: '', // Default value for experience
    candidateGithub: '',
  
  };

  selectedFile: File | null = null;
  isSubmitting = false;
  isError = false;
  isSuccess = false; // Added missing property
  errorMessage = '';
  fileError = false; // Added for file validation
  maxFileSizeMB = 5; // Max file size in MB

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private jobService: JobPostingService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.application.jobId = params.get('jobId') || '';
      this.application.candidateId = params.get('candidateId') || '';

      if (this.application.jobId) {
        this.jobService.getJobById(this.application.jobId).subscribe({
          next: (job) => {
            this.application.jobTitle = job.title;
          },
          error: (err) => {
            console.error('Error fetching job:', err);
            this.isError = true;
            this.errorMessage = 'Failed to load job details';
          }
        });
      }
    });

    if (this.application.candidateId) {
      this.candidateService.getCandidateById(this.application.candidateId).subscribe({
        next: (candidate: Candidate) => {
          this.application.candidateName = candidate.name;
          this.application.candidateEmail = candidate.email;
          this.application.candidatePhone = candidate.phone;
          this.application.candidatePortfolio = candidate.portfolio;
          this.application.candidateLinkedIn = candidate.linkedIn;
          this.application.candidateGithub = candidate.github;
        },
        error: (err) => {
          console.error('Error fetching candidate:', err);
          this.isError = true;
          this.errorMessage = 'Failed to load candidate information';
        }
      });

    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.fileError = false;
    
    if (!file) {
      return;
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      this.fileError = true;
      this.errorMessage = 'Only PDF files are allowed';
      this.selectedFile = null;
      return;
    }

    // Validate file size
    if (file.size > this.maxFileSizeMB * 1024 * 1024) {
      this.fileError = true;
      this.errorMessage = `File size exceeds ${this.maxFileSizeMB}MB limit`;
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.isError = false;
  }

  submitApplication(): void {
    if (!this.selectedFile) {
      this.isError = true;
      this.errorMessage = 'Please upload your CV';
      return;
    }

    if (this.fileError) {
      return; // Don't submit if there's a file error
    }

    this.isSubmitting = true;
    this.isError = false;
    this.isSuccess = false;

    this.applicationService.applyToJob(this.application, this.selectedFile).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.isSuccess = true;
        this.selectedFile = null;
        
        // Navigate after 2 seconds to show success message
        setTimeout(() => {
          this.router.navigate(['/job-postings']);
        }, 2000);
      },
      error: (err) => {
        console.error('Submission error:', err);
        this.isSubmitting = false;
        this.isError = true;
        this.errorMessage = err.error?.message || 
                          'You have already applied to this job' || 
                          'Failed to submit application';
      }
    });
  }
}