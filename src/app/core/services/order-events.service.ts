import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface OrderCountState {
  count: number;
  label: string;
  live: boolean;
}

/**
 * Subscribes to real backend order events (SSE) so the on-page counter only
 * ever shows genuine numbers. If the backend isn't reachable — e.g. local
 * dev without `npm run server`, or before real volume exists — it falls
 * back to an honest static state instead of fabricating a number.
 */
@Injectable({ providedIn: 'root' })
export class OrderEventsService {
  readonly state = signal<OrderCountState>({
    count: 0,
    label: 'Taking orders today',
    live: false,
  });

  private source?: EventSource;

  constructor(private http: HttpClient) {}

  connect(): void {
    if (this.source || typeof EventSource === 'undefined') {
      return;
    }

    this.http.get<{ count: number; monthLabel: string }>(`${environment.apiBaseUrl}/orders/count`).subscribe({
      next: (res) => this.state.set({ count: res.count, label: res.monthLabel, live: true }),
      error: () => void 0,
    });

    try {
      this.source = new EventSource(`${environment.apiBaseUrl}/orders/stream`);
      this.source.addEventListener('order', (evt: MessageEvent) => {
        const data = JSON.parse(evt.data) as { count: number; monthLabel: string };
        this.state.set({ count: data.count, label: data.monthLabel, live: true });
      });
      this.source.onerror = () => {
        this.source?.close();
        this.source = undefined;
      };
    } catch {
      // Backend not available — static fallback state stands.
    }
  }
}
