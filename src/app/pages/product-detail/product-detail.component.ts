import { Component, OnInit, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PRODUCTS } from '../../core/data/products.data';
import { Product } from '../../core/models/product.model';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ReviewsService } from '../../core/services/reviews.service';
import { IconComponent, IconName } from '../../core/icon/icon.component';
import { AftersalesComponent } from '../../sections/aftersales/aftersales.component';
import { productAccentClass, productIcon } from '../../core/utils/product-accent';
import { BgBlobComponent } from '../../core/bg-blob/bg-blob.component';
import { ProductMiniTileComponent } from '../../sections/product-mini-tile/product-mini-tile.component';
import { sortByStock } from '../../core/utils/sort-products';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [NgClass, RouterLink, IconComponent, ProductMiniTileComponent, AftersalesComponent, BgBlobComponent],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  readonly product = signal<Product | undefined>(undefined);
  readonly planIndex = signal(0);
  readonly allReviews;

  readonly reviews = computed(() =>
    this.allReviews().filter((r) => r.product === this.product()?.name),
  );

  readonly relatedProducts = computed(() =>
    sortByStock(PRODUCTS.filter((p) => p.id !== this.product()?.id)),
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private whatsapp: WhatsappService,
    private analytics: AnalyticsService,
    private reviewsService: ReviewsService,
  ) {
    this.allReviews = this.reviewsService.reviews;
  }

  ngOnInit(): void {
    this.reviewsService.load();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const found = PRODUCTS.find((p) => p.id === id);
      if (!found) {
        this.router.navigate(['/products']);
        return;
      }
      this.product.set(found);
      this.planIndex.set(0);
      window.scrollTo({ top: 0 });
    });
  }

  selectPlan(index: number): void {
    this.planIndex.set(index);
  }

  get plan() {
    return this.product()!.plans[this.planIndex()];
  }

  get accentClass(): string {
    const p = this.product();
    return p ? productAccentClass(p) : '';
  }

  get icon(): IconName | null {
    const p = this.product();
    return p ? productIcon(p) : null;
  }

  get discountPercent(): number {
    const plan = this.plan;
    return Math.round(100 - (plan.discountedPrice / plan.originalPrice) * 100);
  }

  get whatsappLink(): string {
    const p = this.product();
    return p ? this.whatsapp.linkForProduct(p, this.plan) : this.whatsapp.linkGeneric();
  }

  onWhatsappClick(): void {
    const p = this.product();
    if (p) {
      this.analytics.trackWhatsappClick(p.id, p.name);
    }
  }
}
