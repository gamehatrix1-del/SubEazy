import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { PRODUCTS } from '../../core/data/products.data';
import { IconComponent } from '../../core/icon/icon.component';
import { BgBlobComponent } from '../../core/bg-blob/bg-blob.component';

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, IconComponent, BgBlobComponent],
  templateUrl: './hero.component.html',
  animations: [
    trigger('heroEnter', [
      transition(':enter', [
        query('.hero-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(90, animate(`420ms ${EASE}`, style({ opacity: 1, transform: 'translateY(0)' }))),
        ]),
      ]),
    ]),
  ],
})
export class HeroComponent {
  readonly linkedin = PRODUCTS.find((p) => p.id === 'linkedin-career')!;
  readonly canva = PRODUCTS.find((p) => p.id === 'canva-pro')!;
  readonly moreCount = PRODUCTS.length - 2;

  /** Best-value (longest) plan for each tile, so the hero shows the deepest discount. */
  readonly linkedinPlan = this.linkedin.plans[this.linkedin.plans.length - 1];
  readonly canvaPlan = this.canva.plans[this.canva.plans.length - 1];

  get linkedinDiscount(): number {
    return Math.round(100 - (this.linkedinPlan.discountedPrice / this.linkedinPlan.originalPrice) * 100);
  }

  constructor(
    private whatsapp: WhatsappService,
    private analytics: AnalyticsService,
  ) {}

  get whatsappLink(): string {
    return this.whatsapp.linkGeneric();
  }

  onWhatsappClick(): void {
    this.analytics.trackWhatsappClick('hero', 'hero-cta');
  }
}
