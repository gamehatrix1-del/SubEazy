import { Component } from '@angular/core';
import { AboutComponent } from '../../sections/about/about.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [AboutComponent],
  template: `<app-about />`,
})
export class AboutPageComponent {}
