import { take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MakePaymentModel, IPaymentDetails } from './model';
import { MakePaymentService } from './make-payment.service';
import { expiryDateValidator } from '../../shared/validators';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  form: FormGroup;
  disabled = false;
  hasFormErrors = false;
  isDateExpired = false;
  data: IPaymentDetails;
  apiErrors: HttpErrorResponse;
  monthLabel = 'Please enter a valid month';


  constructor(public service: MakePaymentService) { }

  submit(): void {
    this.hasFormErrors = false;
    this.isDateExpired = false;

    const body = this.form.value;
    const isValidDate = expiryDateValidator(body.expiry_month, body.expiry_year);

    if (this.form.invalid) {
      this.hasFormErrors = true;
      return;
    }

    if (!isValidDate) {
      this.isDateExpired = true;
      this.monthLabel = 'Month is already passed.';
      this.form.get('expiry_month').setErrors({ errors: true });
      return;
    }

    this.disabled = true;
    this.service.postPayment(body)
      .pipe(take(1)) // RxJS take operator, so subscriptions happen once and exit.
      .subscribe(
        (response: IPaymentDetails) => {
          this.form.reset();
          this.data = response;
          this.disabled = false;
          },
        (err: HttpErrorResponse) => { this.disabled = false; this.apiErrors = err; });
  }

  ngOnInit(): void {
    this.form = MakePaymentModel.form();
  }

}
