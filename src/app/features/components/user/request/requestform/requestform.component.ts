import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request.service';

@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})
export class RequestformComponent {

  form = this.fb.group({
    type: ['', Validators.required],
    employeeId: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    justification: ['']
  });
  requestId: string | null = null;


  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.requestId = params.get('id');
      if (this.requestId) {
        this.requestService.getRequestById(this.requestId).subscribe(request => {
          this.form.patchValue(request);
        });
      }
    });
  }

  submitRequest() {
    if (this.form.valid) {
      if (this.requestId) {
        this.requestService.updateRequest(this.requestId, this.form.value).subscribe(() => {
          this.router.navigate(['/user/myrequests', this.form.value.employeeId]); // Pass employeeId to the URL
        });
      } else {
        this.requestService.createRequest(this.form.value).subscribe({
          next: (res) => {
            console.log('Request added successfully');
            this.router.navigate(['/user/myrequests', this.form.value.employeeId]); // Pass employeeId to the URL
          },
          error: (err) => {
            console.error('Error adding request:', err);
          }
        });
      }
    } else {
      alert("Merci de remplir tous les champs requis.");
    }
  }

}
