export type ProductAccent = 'linkedin' | 'canva' | 'tools';

export interface PricingPlan {
  /** Short label shown on the duration pill, e.g. "3 months". */
  duration: string;
  originalPrice: number;
  discountedPrice: number;
  /** Eligibility caveat, e.g. "New users only". */
  note?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  initials: string;
  accent: ProductAccent;
  currency: string;
  /** First entry is the default-selected plan. */
  plans: PricingPlan[];
  benefits: string[];
  badge?: string;
  /** Toggle to false to mark every plan on this product as out of stock. */
  inStock: boolean;
}
