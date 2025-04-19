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

  constructor(private jobPostingService: JobPostingService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobPostingService.getAllJobs().subscribe(data => {
      this.jobPostings = data;
    });
  }

  deleteJob(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      this.jobPostingService.deleteJob(id).subscribe(() => {
        this.loadJobs();
      });
    }
  }
}
