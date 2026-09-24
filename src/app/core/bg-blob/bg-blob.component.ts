import { Component, Input } from '@angular/core';

/**
 * A soft blurred SVG blob used as decorative background content, instead of
 * a flat tinted panel, to break up long stretches of the warm-white page
 * background. Position and size are set by the consumer via host classes
 * (e.g. class="absolute -top-24 -right-24 h-96 w-96").
 */
@Component({
  selector: 'app-bg-blob',
  standalone: true,
  host: { class: 'pointer-events-none absolute block select-none' },
  template: `
    <svg viewBox="0 0 400 400" class="h-full w-full blur-2xl" aria-hidden="true">
      <path [attr.fill]="fill" [attr.opacity]="opacity" [attr.d]="path" />
    </svg>
  `,
})
export class BgBlobComponent {
  @Input() color: 'teal' | 'coral' = 'teal';
  @Input() opacity = 0.5;

  private readonly paths = [
    'M317 63c45 40 72 103 63 162-9 60-55 106-108 137-53 31-114 44-160 17-46-27-77-89-73-147 4-59 42-116 96-152 54-37 137-56 182-17Z',
    'M298 45c50 27 87 79 92 135 5 57-22 118-70 152-48 34-118 41-166 12-49-30-77-92-71-150 5-58 44-110 96-138 53-28 118-38 119-11Z',
  ];

  get fill(): string {
    return this.color === 'coral' ? '#E27A50' : '#0F6E56';
  }

  get path(): string {
    return this.color === 'coral' ? this.paths[1] : this.paths[0];
  }
}
