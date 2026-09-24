import { Review } from '../models/review.model';

/**
 * PLACEHOLDER reviews — Hinglish, Indian names, standing in until real
 * submitted reviews come in via /api/reviews. Swap this array out (or clear
 * it back to []) before real customers see the site — these are not
 * genuine testimonials.
 */
export const REVIEWS: Review[] = [
  {
    id: 'review-1',
    name: 'Priya S.',
    product: 'LinkedIn Premium Career',
    quote:
      'Bhai pricing dekh ke shock lag gaya, itna sasta LinkedIn Premium kahin nahi milta. Order ke 10 min baad hi activate ho gaya. Bahut badhiya service!',
    rating: 5,
    verified: true,
  },
  {
    id: 'review-2',
    name: 'Rohan M.',
    product: 'Canva Pro',
    quote:
      'Canva Pro chahiye tha apne Insta page ke liye, Subeazy se liya aur ekdum genuine nikla, koi issue nahi. WhatsApp pe hi sab ho gaya, itna easy hoga socha nahi tha.',
    rating: 5,
    verified: true,
  },
  {
    id: 'review-3',
    name: 'Ankit V.',
    product: 'NordVPN',
    quote:
      'VPN ki zarurat thi office ke liye, price dekh ke pehle thoda doubt tha but bilkul original NordVPN mila. Setup mein bhi help kiya unhone.',
    rating: 5,
    verified: false,
  },
  {
    id: 'review-4',
    name: 'Sneha K.',
    product: 'Gemini AI Pro',
    quote:
      'Gemini Pro itne kam price mein milega socha nahi tha. 2TB storage bhi saath mein mil gaya. Recommend karungi sabko.',
    rating: 4,
    verified: true,
  },
  {
    id: 'review-5',
    name: 'Rahul D.',
    product: 'Lovable Lite',
    quote:
      'App banane ke liye Lovable try kar raha tha, credits directly mehenge lag rahe the. Subeazy se sasta mil gaya aur kaam bhi smoothly ho gaya.',
    rating: 5,
    verified: false,
  },
  {
    id: 'review-6',
    name: 'Neha P.',
    product: 'LinkedIn Premium Business',
    quote:
      'Business premium chahiye tha job hunt ke liye, unhone same din activate kar diya. Support bhi accha hai, WhatsApp pe reply fast aata hai.',
    rating: 5,
    verified: true,
  },
  {
    id: 'review-7',
    name: 'Vikram T.',
    product: 'Notion Business',
    quote:
      'Team ke liye Notion Business lena tha, budget tight tha startup ka. Subeazy ne genuine deal diya, ab poori team use kar rahi hai.',
    rating: 4,
    verified: false,
  },
  {
    id: 'review-8',
    name: 'Ishita G.',
    product: 'Canva Pro',
    quote:
      'Pehli baar kisi reseller se try kiya tha dar dar ke, but ekdum legit nikla. Ab dusre products bhi yahin se lungi.',
    rating: 5,
    verified: true,
  },
];
