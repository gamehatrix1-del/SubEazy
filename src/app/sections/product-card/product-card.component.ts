import { Component, Input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { IconComponent, IconName } from '../../core/icon/icon.component';
import { productAccentClass, productIcon } from '../../core/utils/product-accent';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgClass, RouterLink, IconComponent],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  readonly planIndex = signal(0);

  constructor(
    private whatsapp: WhatsappService,
    private analytics: AnalyticsService,
  ) {}

  get plan() {
    return this.product.plans[this.planIndex()];
  }

  selectPlan(index: number): void {
    this.planIndex.set(index);
  }

  get accentClass(): string {
    return productAccentClass(this.product);
  }

  get icon(): IconName | null {
    return productIcon(this.product);
  }

  get discountPercent(): number {
    const plan = this.plan;
    return Math.round(100 - (plan.discountedPrice / plan.originalPrice) * 100);
  }

  get whatsappLink(): string {
    return this.whatsapp.linkForProduct(this.product, this.plan);
  }

  onWhatsappClick(): void {
    this.analytics.trackWhatsappClick(this.product.id, this.product.name);
  }
}
