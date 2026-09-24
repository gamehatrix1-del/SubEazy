import { Product } from '../models/product.model';

/** Keeps catalog order within each group, but pushes out-of-stock items to the end. */
export function sortByStock(products: Product[]): Product[] {
  return [...products].sort((a, b) => Number(b.inStock) - Number(a.inStock));
}
