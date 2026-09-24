import { Product } from '../../models/product.model';

export const CANVA_PRODUCTS: Product[] = [
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    tagline: 'Full Pro toolkit',
    initials: 'C',
    accent: 'canva',
    currency: '₹',
    inStock: true,
    // Discounted prices are still placeholders — MRP is Canva's real published India pricing (₹499/mo, ₹3,999/yr).
    plans: [
      { duration: '3 months', originalPrice: 1497, discountedPrice: 399 },
      { duration: '6 months', originalPrice: 2994, discountedPrice: 599 },
      { duration: '12 months', originalPrice: 3999, discountedPrice: 899 },
    ],
    benefits: [
      '100M+ premium templates, photos & fonts',
      'Background remover & Magic Resize',
      '1TB cloud storage for your brand assets',
    ],
  },
];
