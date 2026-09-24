export interface Review {
  id: string;
  name: string;
  product: string;
  quote: string;
  rating: number;
  verified: boolean;
  screenshotUrl?: string;
}
