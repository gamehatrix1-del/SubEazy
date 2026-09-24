import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  submit(submission: ContactSubmission) {
    return this.http.post(`${environment.apiBaseUrl}/contact`, submission);
  }
}
