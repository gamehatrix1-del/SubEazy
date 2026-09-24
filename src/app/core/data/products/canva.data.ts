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
    // MRP is Canva's real published India annual pricing (₹3,999/yr).
    plans: [{ duration: '12 months', originalPrice: 3999, discountedPrice: 599 }],
    benefits: [
      '100M+ premium templates, photos & fonts',
      'Background remover & Magic Resize',
      '1TB cloud storage for your brand assets',
    ],
  },
];
