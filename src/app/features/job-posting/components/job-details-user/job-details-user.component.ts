import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobPostingService } from 'src/app/core/services/job-postings/job-posting.service';
import { JobPosting } from 'src/app/features/job-posting/models/job-posting.model';

@Component({
  selector: 'app-job-details-user',
  templateUrl: './job-details-user.component.html',
  styleUrls: ['./job-details-user.component.css']
})
export class JobDetailsUserComponent {
  job!: JobPosting;

  // Infos du candidat
  candidateId: string = '';
  candidateName: string = '';
  candidateEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobPostingService 
  ) {}

  ngOnInit(): void {
    // 🟡 Récupération depuis localStorage
    this.candidateId = localStorage.getItem('candidateId') || '';
    this.candidateName = localStorage.getItem('candidateName') || '';
    this.candidateEmail = localStorage.getItem('candidateEmail') || '';

    // 🔵 Récupération de l'ID du job depuis l'URL
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.jobService.getJobById(jobId).subscribe((data: JobPosting) => {
        this.job = data;
      });
    }
  }
}