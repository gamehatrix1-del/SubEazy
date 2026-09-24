import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Review } from '../models/review.model';
import { REVIEWS } from '../data/reviews.data';

export interface ReviewSubmission {
  name: string;
  email: string;
  product: string;
  quote: string;
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  readonly reviews = signal<Review[]>(REVIEWS);

  constructor(private http: HttpClient) {}

  load(): void {
    this.http.get<Review[]>(`${environment.apiBaseUrl}/reviews`).subscribe({
      next: (res) => this.reviews.set(res.length ? res : REVIEWS),
      error: () => void 0, // keep the bundled REVIEWS fallback
    });
  }

  submit(submission: ReviewSubmission) {
    return this.http.post(`${environment.apiBaseUrl}/reviews`, submission);
  }
}
