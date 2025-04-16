import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobPosting } from 'src/app/features/job-posting/models/job-posting.model';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {
  private apiUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(this.apiUrl);
  }

  getJobById(id: string): Observable<JobPosting> {
    return this.http.get<JobPosting>(`${this.apiUrl}/${id}`);
  }

  // ✅ Nouvelle version qui accepte FormData (image + JSON)
  // Ajouter une nouvelle offre d'emploi avec une image
  createJobPosting(jobPosting: JobPosting, file: File): Observable<JobPosting> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('jobPosting', JSON.stringify(jobPosting));

    return this.http.post<JobPosting>(this.apiUrl, formData);
  }

  updateJob(id: string, job: JobPosting, file?: File): Observable<JobPosting> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name); // Image file
    }
    formData.append('jobPosting', JSON.stringify(job)); // JobPosting JSON
  
    return this.http.put<JobPosting>(`${this.apiUrl}/${id}`, formData);
  }
  
  
  deleteJob(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ❌ Cette méthode n’est plus utilisée si tu envoies tout ensemble !
  // Tu peux la garder pour un usage futur si tu veux permettre un upload d'image seul.
  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/upload-image`, formData);
  }

 
  

}
