import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';

import { IPaymentDetails } from './model';
import { ApiService } from '../base/services';

@Injectable({
  providedIn: 'root'
})
export class MakePaymentService {
  constructor(private api: ApiService) {}

  postPayment(body, params?: HttpParams): Observable<IPaymentDetails | HttpErrorResponse> {
    const url = `${this.api.BASE_URL}/${this.api.VERSION.V1}/make-payment/`;

    return this.api.post(url, body, params);
  }
}
