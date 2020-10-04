import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService {
  constructor(public http: HttpClient) {}

  abstract getHeaders(): HttpHeaders;

  post(url: string, data: any, params?: HttpParams): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(url, data, { headers, params }).pipe(catchError((err) => throwError(err)));
  }
}
