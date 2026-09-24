import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { BgBlobComponent } from '../../core/bg-blob/bg-blob.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ScrollRevealDirective, BgBlobComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  form = { name: '', email: '', message: '' };
  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly error = signal(false);

  constructor(
    private contactService: ContactService,
    private whatsapp: WhatsappService,
    private analytics: AnalyticsService,
  ) {}

  get whatsappLink(): string {
    return this.whatsapp.linkGeneric();
  }

  onWhatsappClick(): void {
    this.analytics.trackWhatsappClick('contact-section', 'contact-cta');
  }

  submit(): void {
    if (!this.form.name || !this.form.email || !this.form.message) {
      return;
    }
    this.submitting.set(true);
    this.error.set(false);
    this.contactService.submit(this.form).subscribe({
      next: () => {
        this.submitting.set(false);
        this.submitted.set(true);
        this.analytics.trackFormSubmit('contact');
        this.form = { name: '', email: '', message: '' };
      },
      error: () => {
        this.submitting.set(false);
        this.error.set(true);
      },
    });
  }
}
