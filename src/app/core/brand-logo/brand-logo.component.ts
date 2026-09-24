import { Component, Input } from '@angular/core';

/**
 * Subeazy wordmark, matching Subeazy-Logo-Files/SVG/logo-horizontal.svg
 * and logo-white.svg: a teal icon chip with a coral dot, plus a two-tone
 * "sub/eazy" wordmark on light backgrounds, all-white on dark ones.
 */
@Component({
  selector: 'app-brand-logo',
  standalone: true,
  template: `
    <span class="flex items-center gap-2.5">
      <span class="relative flex h-8 w-8 items-center justify-center rounded-[9px]" [class]="iconBgClass">
        <span class="text-sm font-bold text-white">S</span>
        <span class="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-coral-500"></span>
      </span>
      <span class="text-lg font-semibold tracking-tight">
        <span [class]="subClass">sub</span><span [class]="eazyClass">eazy</span>
      </span>
    </span>
  `,
})
export class BrandLogoComponent {
  @Input() variant: 'light' | 'dark' = 'light';

  get iconBgClass(): string {
    return this.variant === 'dark' ? 'bg-white/15' : 'bg-accent-500';
  }

  get subClass(): string {
    return this.variant === 'dark' ? 'text-white' : 'text-ink-900';
  }

  get eazyClass(): string {
    return this.variant === 'dark' ? 'text-white' : 'text-accent-500';
  }
}
