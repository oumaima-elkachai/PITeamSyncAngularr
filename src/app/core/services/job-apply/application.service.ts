import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from 'src/app/features/application/models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8080/api/applications'; 

  constructor(private http: HttpClient) {}

  //  Postuler à un job avec fichier CV
  applyToJob(application: Application, file: File): Observable<Application> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('application', JSON.stringify(application));
    formData.append('candidateId', application.candidateId);

    return this.http.post<Application>(`${this.apiUrl}/${application.jobId}/apply`, formData);
  }

  //  Récupérer toutes les candidatures
  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}`);
  }

  //  Récupérer les candidatures par candidat
  getApplicationsByCandidate(candidateId: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/candidate/${candidateId}`);
  }

  //  Récupérer les candidatures par job
  getApplicationsByJob(jobId: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/job/${jobId}`);
  }

  // Upload du CV
  uploadCv(file: File): Observable<{ cvUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ cvUrl: string }>(`${this.apiUrl}/upload-cv`, formData);
  }

  //  Mise à jour du statut (ACCEPTED / REJECTED)
  updateApplicationStatus(id: string, status: string): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${id}/status?status=${status}`, null);
  }
  
  

 //  Statistiques
 getStats(): Observable<{ [key: string]: number }> {
  return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/stats`);
}


getApplicationsByJobId(jobId: string): Observable<Application[]> {
  return this.http.get<Application[]>(`http://localhost:8080/api/applications/job/${jobId}`);
}



getApplicationById(id: string): Observable<Application> {
  const url = `http://localhost:8080/api/applications/${id}`;
  return this.http.get<Application>(url);
}


// Méthode pour mettre à jour le statut de l'application
updateApplication(application: Application): Observable<Application> {
  return this.http.put<Application>(`${this.apiUrl}/${application.id}/status`, application);
}

// Méthode d'upload d'image
uploadImage(file: File): Observable<{ imageUrl: string }> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/upload-image`, formData);
}

deleteApplication(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

getRankedApplications(jobId: string): Observable<Application[]> {
  return this.http.get<Application[]>(`${this.apiUrl}/ranked/${jobId}`);
}

getApplicationsCountByJob(): Observable<{ [jobTitle: string]: number }> {
  return this.http.get<{ [jobTitle: string]: number }>(`${this.apiUrl}/stats/by-job`);
}
getApplicationsCountByStatus(): Observable<{ [status: string]: number }> {
  return this.http.get<{ [status: string]: number }>(`${this.apiUrl}/stats`);
}

}
