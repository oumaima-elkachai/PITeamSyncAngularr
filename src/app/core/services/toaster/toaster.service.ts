import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  success(message: string): void {
    this.toastr.success(message, 'Success');
  }

  error(message: string): void {
    this.toastr.error(message, 'Error');
  }

  info(message: string): void {
    this.toastr.info(message, 'Info');
  }
}
