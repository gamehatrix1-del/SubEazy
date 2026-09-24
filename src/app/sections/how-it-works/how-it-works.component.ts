import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { IconComponent, IconName } from '../../core/icon/icon.component';

interface Step {
  icon: IconName;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [ScrollRevealDirective, IconComponent],
  templateUrl: './how-it-works.component.html',
})
export class HowItWorksComponent {
  readonly steps: Step[] = [
    { icon: 'target', title: 'Choose your plan', description: 'Pick LinkedIn Premium, Canva Pro, or an AI tool from the shop.' },
    { icon: 'message', title: 'Message Subeazy', description: 'Tap the WhatsApp CTA — your plan is already in the chat, no forms to fill.' },
    { icon: 'shield', title: 'Pay securely', description: "We'll send a secure payment link and confirm your order right there." },
    { icon: 'bolt', title: 'Get set up', description: 'Instant activation or email delivery, plus hands-on setup support.' },
  ];
}
