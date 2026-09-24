import { Component } from '@angular/core';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  templateUrl: './whatsapp-fab.component.html',
})
export class WhatsappFabComponent {
  constructor(
    private whatsapp: WhatsappService,
    private analytics: AnalyticsService,
  ) {}

  get link(): string {
    return this.whatsapp.linkGeneric();
  }

  onClick(): void {
    this.analytics.trackWhatsappClick('fab', 'floating-cta');
  }
}
