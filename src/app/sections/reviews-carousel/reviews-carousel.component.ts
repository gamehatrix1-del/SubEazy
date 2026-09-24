import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewsService } from '../../core/services/reviews.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { PRODUCTS } from '../../core/data/products.data';

@Component({
  selector: 'app-reviews-carousel',
  standalone: true,
  imports: [FormsModule, ScrollRevealDirective],
  templateUrl: './reviews-carousel.component.html',
})
export class ReviewsCarouselComponent implements OnInit {
  readonly reviews;
  readonly products = PRODUCTS;

  readonly formOpen = signal(false);
  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly error = signal(false);

  form = { name: '', email: '', product: PRODUCTS[0]?.name ?? '', quote: '', rating: 5 };

  constructor(
    private reviewsService: ReviewsService,
    private analytics: AnalyticsService,
  ) {
    this.reviews = this.reviewsService.reviews;
  }

  ngOnInit(): void {
    this.reviewsService.load();
  }

  /** Doubled list drives the seamless CSS marquee loop; only rendered once real reviews exist. */
  get loopedReviews() {
    const list = this.reviews();
    return list.length ? [...list, ...list] : [];
  }

  toggleForm(): void {
    this.formOpen.update((v) => !v);
    this.submitted.set(false);
    this.error.set(false);
  }

  submit(): void {
    if (!this.form.name || !this.form.quote) {
      return;
    }
    this.submitting.set(true);
    this.reviewsService.submit(this.form).subscribe({
      next: () => {
        this.submitting.set(false);
        this.submitted.set(true);
        this.analytics.trackFormSubmit('review');
        this.form = { name: '', email: '', product: PRODUCTS[0]?.name ?? '', quote: '', rating: 5 };
      },
      error: () => {
        this.submitting.set(false);
        this.error.set(true);
      },
    });
  }
}
