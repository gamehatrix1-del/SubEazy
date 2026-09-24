import { Product } from '../models/product.model';
import { IconName } from '../icon/icon.component';

const ACCENT_CLASSES: Record<Product['accent'], string> = {
  linkedin: 'from-[#0A66C2] to-[#004182]',
  canva: 'from-[#8B3DFF] to-[#00C4CC]',
  tools: 'from-emerald-400 to-teal-600',
};

/**
 * Approximate real brand colors per product, since we don't have official
 * logo files for these — swap for real SVG marks if/when they're supplied
 * (the way Subeazy's own logo pack was).
 */
const PRODUCT_ID_OVERRIDES: Record<string, string> = {
  'lovable-lite': 'from-[#FF6B7A] to-[#E23E57]',
  'lovable-pro': 'from-[#E23E57] to-[#9C1F38]',
  datacamp: 'from-[#05192D] to-[#03A65A]',
  nordvpn: 'from-[#1B2A4A] to-[#0B1526]',
  'notion-business': 'from-ink-900 to-ink-950',
  'gemini-ai-pro': 'from-[#4C8DFF] to-[#B94FE0]',
};

/** A couple of products read better as a brand icon than as text initials. */
const PRODUCT_ID_ICONS: Record<string, IconName> = {
  nordvpn: 'shield',
  'lovable-lite': 'heart',
  'lovable-pro': 'heart',
  'gemini-ai-pro': 'spark',
};

export function productAccentClass(product: Product): string {
  return PRODUCT_ID_OVERRIDES[product.id] ?? ACCENT_CLASSES[product.accent];
}

export function productIcon(product: Product): IconName | null {
  return PRODUCT_ID_ICONS[product.id] ?? null;
}
