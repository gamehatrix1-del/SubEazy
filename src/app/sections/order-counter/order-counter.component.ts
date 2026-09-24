import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { OrderEventsService } from '../../core/services/order-events.service';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { IconComponent } from '../../core/icon/icon.component';

@Component({
  selector: 'app-order-counter',
  standalone: true,
  imports: [ScrollRevealDirective, IconComponent],
  templateUrl: './order-counter.component.html',
})
export class OrderCounterComponent implements OnInit, AfterViewInit {
  @ViewChild('numberEl') numberEl?: ElementRef<HTMLElement>;

  readonly state;
  readonly displayValue = signal(0);

  private observer?: IntersectionObserver;
  private animated = false;

  constructor(
    private orderEvents: OrderEventsService,
    private whatsapp: WhatsappService,
    private analytics: AnalyticsService,
  ) {
    this.state = this.orderEvents.state;
  }

  get whatsappLink(): string {
    return this.whatsapp.linkGeneric();
  }

  onWhatsappClick(): void {
    this.analytics.trackWhatsappClick('order-counter', 'be-first-cta');
  }

  ngOnInit(): void {
    this.orderEvents.connect();
  }

  ngAfterViewInit(): void {
    if (!this.numberEl || typeof IntersectionObserver === 'undefined') {
      this.displayValue.set(this.state().count);
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.animated && this.state().live) {
            this.animated = true;
            this.animateCount(this.state().count);
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(this.numberEl.nativeElement);
  }

  private animateCount(target: number): void {
    const duration = 1200;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      this.displayValue.set(Math.round(ease(progress) * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }
}
