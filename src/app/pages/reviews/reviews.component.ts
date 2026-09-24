import { Component } from '@angular/core';
import { ReviewsCarouselComponent } from '../../sections/reviews-carousel/reviews-carousel.component';
import { BgBlobComponent } from '../../core/bg-blob/bg-blob.component';

@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [ReviewsCarouselComponent, BgBlobComponent],
  templateUrl: './reviews.component.html',
})
export class ReviewsPageComponent {}
