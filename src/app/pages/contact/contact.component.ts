import { Component } from '@angular/core';
import { ContactComponent } from '../../sections/contact/contact.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactComponent],
  template: `<app-contact />`,
})
export class ContactPageComponent {}
