import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { BrandLogoComponent } from '../../core/brand-logo/brand-logo.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, BrandLogoComponent],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  readonly menuOpen = signal(false);

  readonly links = [
    { label: 'Shop', path: '/products', fragment: null as string | null },
    { label: 'How it works', path: '/', fragment: 'how-it-works' },
    { label: 'Reviews', path: '/reviews', fragment: null },
    { label: 'About', path: '/about', fragment: null },
    { label: 'Contact', path: '/contact', fragment: null },
  ];

  constructor(
    private whatsapp: WhatsappService,
    private analytics: AnalyticsService,
  ) {}

  get whatsappLink(): string {
    return this.whatsapp.linkGeneric();
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  onWhatsappClick(): void {
    this.analytics.trackWhatsappClick('nav', 'nav-cta');
  }
}
