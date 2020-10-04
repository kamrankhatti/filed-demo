import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends HttpService {
  readonly BASE_URL = 'https://api.halls.pk';

  readonly VERSION = {
    V1: 'v1'
  };

  constructor(http: HttpClient) {
    super(http);
  }

  getHeaders(): HttpHeaders {
    /* using sample token just for testing purpose
    * otherwise access token could be taken from local storage
    * after a successful login call. */
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });
  }
}
