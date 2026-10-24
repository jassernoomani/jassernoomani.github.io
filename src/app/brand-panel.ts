import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';

export interface PanelFact {
  label: string;
  value: string;
}

/** About-section identity panel: JN emblem, live Tunis time and a few quick facts. */
@Component({
  selector: 'app-brand-panel',
  template: `<div class="about-art">
    <div class="panel-top">
      <span class="eyebrow">{{ caption }}</span>
      <span class="clock" [attr.aria-label]="clockLabel + ' ' + time()">
        <i aria-hidden="true"></i>{{ clockLabel }} · {{ time() }}
      </span>
    </div>
    <div class="emblem" aria-hidden="true">
      <span class="glow"></span>
      <span class="ring ring-ticks"></span>
      <span class="ring ring-dash"></span>
      <span class="ring ring-orbit"><b></b></span>
      <img src="brand-mark.svg" width="200" height="200" alt="" />
    </div>
    <div class="signature">
      <strong>Jasser Noomani</strong><span>{{ roleLabel }}</span>
    </div>
    <dl class="facts">
      @for (f of facts; track f.label; let i = $index) {
        <div>
          <dt><b>0{{ i + 1 }}</b>{{ f.label }}</dt>
          <dd>{{ f.value }}</dd>
        </div>
      }
    </dl>
  </div>`,
  styleUrl: './brand-panel.css',
})
export class BrandPanel implements OnInit, OnDestroy {
  @Input({ required: true }) caption = '';
  @Input({ required: true }) roleLabel = '';
  @Input() clockLabel = 'TUNIS';
  @Input() facts: PanelFact[] = [];
  readonly time = signal('');
  private timer?: ReturnType<typeof setInterval>;
  private readonly format = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Tunis',
  });

  ngOnInit() {
    const tick = () => this.time.set(this.format.format(new Date()));
    tick();
    this.timer = setInterval(tick, 20_000);
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
