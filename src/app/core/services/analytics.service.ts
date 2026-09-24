import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Thin wrapper around the Meta Pixel + a server-side Conversions API relay.
 * Both calls share the same eventId so Meta can dedupe browser vs. server events.
 * Set environment.metaPixelId to enable the browser pixel; the CAPI relay
 * lives in the backend (server/routes/track.js) since it needs the access token.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private pixelLoaded = false;

  constructor(private http: HttpClient) {}

  init(): void {
    if (!environment.metaPixelId || this.pixelLoaded || typeof document === 'undefined') {
      return;
    }
    this.pixelLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    window.fbq = window.fbq || function fbqStub(...args: unknown[]) {
      ((window.fbq as any).q = (window.fbq as any).q || []).push(args);
    };
    window.fbq('init', environment.metaPixelId);
    window.fbq('track', 'PageView');
  }

  trackWhatsappClick(productId: string, productName: string): void {
    const eventId = this.makeEventId();
    window.fbq?.('trackCustom', 'WhatsAppClick', { productId, productName }, { eventID: eventId });
    this.relayToServer('WhatsAppClick', eventId, { productId, productName });
  }

  trackFormSubmit(formName: 'contact' | 'review'): void {
    const eventId = this.makeEventId();
    window.fbq?.('track', 'Lead', { formName }, { eventID: eventId });
    this.relayToServer('Lead', eventId, { formName });
  }

  private relayToServer(eventName: string, eventId: string, payload: Record<string, unknown>): void {
    this.http
      .post(`${environment.apiBaseUrl}/track`, { eventName, eventId, payload })
      .subscribe({ error: () => void 0 });
  }

  private makeEventId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
