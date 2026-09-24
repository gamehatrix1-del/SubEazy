import { Product } from '../../models/product.model';

export const LINKEDIN_PRODUCTS: Product[] = [
  {
    id: 'linkedin-career',
    name: 'LinkedIn Premium Career',
    tagline: 'Career',
    initials: 'in',
    accent: 'linkedin',
    currency: '₹',
    inStock: true,
    badge: 'Most popular',
    plans: [
      { duration: '3 months', originalPrice: 4799, discountedPrice: 499, note: 'New users only' },
      { duration: '2 months', originalPrice: 3199, discountedPrice: 1199 },
      { duration: '12 months', originalPrice: 15349, discountedPrice: 4999 },
    ],
    benefits: [
      'InMail credits & who’s viewed your profile',
      'LinkedIn Learning courses included',
      'Advanced search & salary insights',
    ],
  },
  {
    id: 'linkedin-business',
    name: 'LinkedIn Premium Business',
    tagline: 'Business',
    initials: 'in',
    accent: 'linkedin',
    currency: '₹',
    inStock: true,
    plans: [
      { duration: '2 months', originalPrice: 9999, discountedPrice: 1499 },
      { duration: '12 months', originalPrice: 47999, discountedPrice: 5999 },
    ],
    benefits: [
      'Unlimited people browsing & business insights',
      'Advanced search filters for prospecting',
      'LinkedIn Learning courses included',
    ],
  },
];
