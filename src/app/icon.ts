import { Component, Input } from '@angular/core';

export type IconName =
  | 'github'
  | 'linkedin'
  | 'envelope'
  | 'arrow-up-right'
  | 'copy'
  | 'check'
  | 'pause'
  | 'play'
  | 'arrow-up'
  | 'code-slash'
  | 'cpu'
  | 'hdd-network'
  | 'window'
  | 'download'
  | 'phone'
  | 'shield-check';

/** Bootstrap Icons, bundled locally. License and original SVGs live in public/icons. */
@Component({
  selector: 'app-icon',
  template: `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <use [attr.href]="'icons/sprite.svg#' + name" />
  </svg>`,
  host: { 'aria-hidden': 'true' },
  styles: `
    :host {
      display: inline-flex;
      width: 1em;
      height: 1em;
      flex: 0 0 auto;
      vertical-align: -0.125em;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  @Input({ required: true }) name!: IconName;
}
