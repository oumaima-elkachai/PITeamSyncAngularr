import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobPosting } from 'src/app/features/job-posting/models/job-posting.model';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {
  private apiUrl = 'http://localhost:8084/api/jobs'; // URL Backend Spring Boot

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(this.apiUrl);
  }

  getJobById(id: string): Observable<JobPosting> {
    return this.http.get<JobPosting>(`${this.apiUrl}/${id}`);
  }

  addJob(job: JobPosting): Observable<JobPosting> {
    return this.http.post<JobPosting>(this.apiUrl, job);
  }

  updateJob(id: string, job: JobPosting): Observable<JobPosting> {
    return this.http.put<JobPosting>(`${this.apiUrl}/${id}`, job);
  }

  deleteJob(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
