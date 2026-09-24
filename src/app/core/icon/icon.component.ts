import { Component, Input } from '@angular/core';

export type IconName =
  | 'target'
  | 'message'
  | 'shield'
  | 'bolt'
  | 'wrench'
  | 'mail'
  | 'clock'
  | 'bell'
  | 'spark'
  | 'arrow-right'
  | 'check'
  | 'star'
  | 'heart'
  | 'chevron-down';

/**
 * Small hand-drawn line-icon set (1.75 stroke, round caps) so the site
 * doesn't lean on emoji for iconography.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      @switch (name) {
        @case ('target') {
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="0.5" fill="currentColor" />
        }
        @case ('message') {
          <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4.5 4V5.5Z" />
        }
        @case ('shield') {
          <path d="M12 3.5 5 6v5.3c0 4.2 2.9 7.3 7 8.7 4.1-1.4 7-4.5 7-8.7V6l-7-2.5Z" />
          <path d="m9 12 2 2 4-4.2" />
        }
        @case ('bolt') {
          <path d="M12.5 3 5 14h5.5L11 21l7.5-11H13l-.5-7Z" />
        }
        @case ('wrench') {
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5l-6 6a1.5 1.5 0 0 0 2.1 2.1l6-6a4 4 0 0 0 5-5.4l-2.6 2.6-1.7-.4-.4-1.7 2.6-2.6Z" />
        }
        @case ('mail') {
          <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
          <path d="m4 6.5 8 6.5 8-6.5" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        }
        @case ('bell') {
          <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        }
        @case ('spark') {
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        }
        @case ('arrow-right') {
          <path d="M4 12h16M14 6l6 6-6 6" />
        }
        @case ('check') {
          <path d="M5 12.5 9.5 17 19 7" />
        }
        @case ('star') {
          <path d="m12 3.5 2.6 5.5 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6-4.4-4.1 6-.7Z" />
        }
        @case ('heart') {
          <path
            fill="currentColor"
            stroke="none"
            d="M12 20.2s-7.2-4.4-9.7-9.1C.6 7.9 2 4.6 5.1 3.8c2-.5 3.9.3 5 2 .3.5 1 1.3 1.9 1.3s1.6-.8 1.9-1.3c1.1-1.7 3-2.5 5-2 3.1.8 4.5 4.1 2.8 7.3-2.5 4.7-9.7 9.1-9.7 9.1Z"
          />
        }
        @case ('chevron-down') {
          <path d="m6 9 6 6 6-6" />
        }
      }
    </svg>
  `,
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 22;
}
