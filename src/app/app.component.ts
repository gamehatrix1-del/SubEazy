import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { WhatsappFabComponent } from './layout/whatsapp-fab/whatsapp-fab.component';
import { MobileCtaBarComponent } from './layout/mobile-cta-bar/mobile-cta-bar.component';
import { AnalyticsService } from './core/services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, WhatsappFabComponent, MobileCtaBarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.analytics.init();
  }
}
