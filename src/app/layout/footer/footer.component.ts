import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { BrandLogoComponent } from '../../core/brand-logo/brand-logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, BrandLogoComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  constructor(private whatsapp: WhatsappService) {}

  get whatsappLink(): string {
    return this.whatsapp.linkGeneric();
  }
}
