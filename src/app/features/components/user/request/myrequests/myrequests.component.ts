import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-myrequests',
  templateUrl: './myrequests.component.html',
  styleUrls: ['./myrequests.component.css']
})
export class MyrequestsComponent implements OnInit {
  
  requests: any[] = [];
  editRequestForm: FormGroup; // Formulaire d'édition
  isEditing: boolean = false; // Variable pour activer/désactiver le mode édition
  currentRequestId: string | null = null; // ID de la demande en cours d'édition

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire
    this.editRequestForm = this.fb.group({
      type: ['', Validators.required],
      employeeId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      justification: ['']
    });
  }


  // In myrequests.component.ts

  ngOnInit() {
    // Get employeeId from route parameters
    this.route.paramMap.subscribe(params => {
      const empId = params.get('employeeId');
      console.log('Employee ID:', empId);
  
      if (empId) {
          this.requestService.getRequestsByEmployee(empId).subscribe({
              next: (data) => {
                  console.log('Requests:', data);
                  this.requests = data;
              },
              error: (err) => {
                  console.error('Error fetching requests:', err);
              }
          });
      }
    });
  }

  // Fonction pour initialiser le formulaire en mode édition
  
  editRequest(id: string) {
    console.log('Request ID:', id);
    if (id) {
      this.isEditing = true;
      this.currentRequestId = id;
  
      this.requestService.getRequestById(id).subscribe(request => {
        this.editRequestForm.patchValue({
          type: request.type,
          employeeId: request.employeeId,
          startDate: new Date(request.startDate).toISOString().split('T')[0],
          endDate: new Date(request.endDate).toISOString().split('T')[0],
          justification: request.justification || ''
        });
      });
    } else {
      console.error('Request ID is undefined');
    }
  }

  deleteRequest(id: string) {
    if (confirm('Are you sure you want to delete this request?')) {
      this.requestService.deleteRequest(id).subscribe(() => {
        this.requests = this.requests.filter(request => request.id !== id); // ✅ mise à jour locale
        console.log('Request deleted successfully');
      }, (err) => {
        console.error('Error deleting request:', err);
      });
    }
  }
  
  

  // Fonction pour soumettre le formulaire d'édition
  submitEditRequest() {
    if (this.editRequestForm.valid && this.currentRequestId) {
      this.requestService.updateRequest(this.currentRequestId, this.editRequestForm.value).subscribe(updatedRequest => {
        const index = this.requests.findIndex(r => r.id === this.currentRequestId);
        if (index !== -1) {
          this.requests[index] = updatedRequest; // ✅ Mise à jour locale de la liste
        }
  
        this.isEditing = false;
        this.currentRequestId = null;
        this.editRequestForm.reset(); // facultatif
      });
    } else {
      alert("Veuillez remplir tous les champs requis.");
    }
  }
  
  
}
