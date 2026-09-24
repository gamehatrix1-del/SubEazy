import { Product } from '../models/product.model';
import { LINKEDIN_PRODUCTS } from './products/linkedin.data';
import { CANVA_PRODUCTS } from './products/canva.data';
import { TOOLS_PRODUCTS } from './products/tools.data';

/**
 * Catalog is split by brand/category under ./products — edit the file for
 * that product instead of this one. This barrel just combines them so the
 * rest of the app can keep importing PRODUCTS from a single stable path.
 */
export const PRODUCTS: Product[] = [...LINKEDIN_PRODUCTS, ...CANVA_PRODUCTS, ...TOOLS_PRODUCTS];
