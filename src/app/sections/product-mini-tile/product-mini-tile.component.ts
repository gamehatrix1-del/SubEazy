import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { IconComponent, IconName } from '../../core/icon/icon.component';
import { productAccentClass, productIcon } from '../../core/utils/product-accent';

/**
 * Compact product tile — icon chip, name and a starting price — used
 * wherever a full app-product-card would be too heavy, e.g. the "Other
 * plans" row on a product detail page.
 */
@Component({
  selector: 'app-product-mini-tile',
  standalone: true,
  imports: [NgClass, RouterLink, IconComponent],
  template: `
    <a
      [routerLink]="['/products', product.id]"
      class="flex items-center gap-3 rounded-2xl border border-ink-900/8 bg-white p-4 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 hover:shadow-md"
      [class.opacity-60]="!product.inStock"
    >
      <span
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-black text-white"
        [ngClass]="accentClass"
      >
        @if (icon) {
          <app-icon [name]="icon" [size]="16" />
        } @else {
          {{ product.initials }}
        }
      </span>
      <div class="min-w-0">
        <h3 class="truncate text-sm font-bold text-ink-950">{{ product.name }}</h3>
        @if (product.inStock) {
          <p class="text-xs text-ink-500">from {{ product.currency }}{{ startingPrice }}</p>
        } @else {
          <p class="text-xs font-semibold text-ink-500">Out of stock</p>
        }
      </div>
    </a>
  `,
})
export class ProductMiniTileComponent {
  @Input({ required: true }) product!: Product;

  get accentClass(): string {
    return productAccentClass(this.product);
  }

  get icon(): IconName | null {
    return productIcon(this.product);
  }

  get startingPrice(): number {
    return Math.min(...this.product.plans.map((p) => p.discountedPrice));
  }
}
