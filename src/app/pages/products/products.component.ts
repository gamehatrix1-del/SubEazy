import { Component } from '@angular/core';
import { ProductGridComponent } from '../../sections/product-grid/product-grid.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductGridComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {}
