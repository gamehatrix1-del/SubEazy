import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PricingPlan, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  private readonly number = environment.whatsappNumber;

  /** Prefilled message for a specific product + plan, naming Subeazy so context carries into the chat. */
  linkForProduct(product: Product, plan: PricingPlan = product.plans[0]): string {
    const message =
      `Hi Subeazy! I'd like to order *${product.name}* ` +
      `(${plan.duration}, ${product.currency}${plan.discountedPrice}). ` +
      `Can you help me get set up?`;
    return this.buildLink(message);
  }

  /** Generic entry point for the hero / nav / footer CTAs. */
  linkGeneric(): string {
    const message = "Hi Subeazy! I'd like to know more about your subscription deals.";
    return this.buildLink(message);
  }

  private buildLink(message: string): string {
    return `https://wa.me/${this.number}?text=${encodeURIComponent(message)}`;
  }
}
