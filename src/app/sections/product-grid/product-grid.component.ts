import { Component, computed, signal } from '@angular/core';
import { PRODUCTS } from '../../core/data/products.data';
import { Product, ProductAccent } from '../../core/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { sortByStock } from '../../core/utils/sort-products';

type Filter = 'all' | ProductAccent;

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent, ScrollRevealDirective],
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent {
  readonly categories: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All plans' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'canva', label: 'Canva' },
    { id: 'tools', label: 'Tools' },
  ];

  readonly activeFilter = signal<Filter>('all');

  readonly products = computed<Product[]>(() => {
    const filter = this.activeFilter();
    const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.accent === filter);
    return sortByStock(list);
  });

  setFilter(filter: Filter): void {
    this.activeFilter.set(filter);
  }
}
