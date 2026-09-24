import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../sections/hero/hero.component';
import { OrderCounterComponent } from '../../sections/order-counter/order-counter.component';
import { HowItWorksComponent } from '../../sections/how-it-works/how-it-works.component';
import { ProductCardComponent } from '../../sections/product-card/product-card.component';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { PRODUCTS } from '../../core/data/products.data';
import { sortByStock } from '../../core/utils/sort-products';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HeroComponent,
    OrderCounterComponent,
    HowItWorksComponent,
    ProductCardComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly products = sortByStock(PRODUCTS).slice(0, 3);
}
