import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { BgBlobComponent } from '../../core/bg-blob/bg-blob.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollRevealDirective, BgBlobComponent],
  templateUrl: './about.component.html',
})
export class AboutComponent {}
