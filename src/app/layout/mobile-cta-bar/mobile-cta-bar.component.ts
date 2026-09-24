import { Component } from '@angular/core';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { PRODUCTS } from '../../core/data/products.data';

/**
 * Full-width sticky action bar shown on mobile only, so the WhatsApp CTA
 * stays reachable no matter how far someone scrolls — a small floating
 * circle is easy to miss/ignore; a bar with the actual price restates the
 * offer every time it's in view.
 */
@Component({
  selector: 'app-mobile-cta-bar',
  standalone: true,
  templateUrl: './mobile-cta-bar.component.html',
})
export class MobileCtaBarComponent {
  readonly startingPrice = Math.min(
    ...PRODUCTS.filter((p) => p.inStock).flatMap((p) => p.plans.map((plan) => plan.discountedPrice)),
  );

  constructor(
    private whatsapp: WhatsappService,
    private analytics: AnalyticsService,
  ) {}

  get whatsappLink(): string {
    return this.whatsapp.linkGeneric();
  }

  onWhatsappClick(): void {
    this.analytics.trackWhatsappClick('mobile-cta-bar', 'sticky-bar');
  }
}
