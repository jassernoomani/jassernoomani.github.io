import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brand-panel',
  template: `<div class="about-art">
    <span class="eyebrow">{{ caption }}</span>
    <div class="monogram-art">
      <img src="brand-mark.svg" width="290" height="290" alt="JN — Jasser Noomani" />
      <div class="signature">
        Jasser Noomani<span>{{ roleLabel }}</span>
      </div>
    </div>
    <div class="about-art-bottom">
      <span>{{ locationLabel }}</span
      ><span>JN — 2026</span>
    </div>
  </div>`,
  styleUrl: './brand-panel.css',
})
export class BrandPanel {
  @Input({ required: true }) caption = '';
  @Input({ required: true }) roleLabel = '';
  @Input({ required: true }) locationLabel = '';
}
