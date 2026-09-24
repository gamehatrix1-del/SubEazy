import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { IconComponent, IconName } from '../../core/icon/icon.component';
import { BgBlobComponent } from '../../core/bg-blob/bg-blob.component';

interface TrustPoint {
  icon: IconName;
  title: string;
  description: string;
}

@Component({
  selector: 'app-aftersales',
  standalone: true,
  imports: [ScrollRevealDirective, IconComponent, BgBlobComponent],
  templateUrl: './aftersales.component.html',
})
export class AftersalesComponent {
  readonly points: TrustPoint[] = [
    { icon: 'wrench', title: 'Setup assistance included', description: "We don't just hand over a login — we walk you through activation on every order." },
    { icon: 'mail', title: 'Email delivery available', description: 'Prefer not to use WhatsApp for delivery? Ask and we’ll send credentials by email instead.' },
    { icon: 'clock', title: 'Fast support window', description: 'Real replies within hours during our support hours, not an auto-reply bot.' },
    { icon: 'bell', title: 'Renewal reminders', description: 'We message you before your plan expires so you never lose access unexpectedly.' },
  ];
}
