import { Review } from '../models/review.model';

/**
 * Launch with real, submitted reviews only — append here as they come in
 * via the /api/reviews endpoint (moderate before promoting to this list).
 * Keeping this array short and honest beats padding it with fake reviews.
 */
export const REVIEWS: Review[] = [];
