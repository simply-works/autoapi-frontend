import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastService: ToastrService) { }

  showErrorMessage(message) {
    if (message) {
      this.toastService.error(message, 'Error');
    } else {
      this.toastService.error('Some error occurred', 'Error');
    }
  }


  showSuccessMessage(message) {
    this.toastService.success(message, 'Success');
  }
}
