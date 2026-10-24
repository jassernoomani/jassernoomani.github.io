import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';
import type { SceneController } from './three-scene';

@Component({
  selector: 'app-orbital-scene',
  template: `<div class="scene-host" #host [class.ready]="ready()" [class.fallback]="failed()">
    <div class="scene-fallback" aria-hidden="true">
      <img src="brand-mark.svg" alt="" width="240" height="240" /><i></i><i></i>
    </div>
  </div>`,
  styles: `
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
    .scene-host {
      width: 100%;
      height: 100%;
      cursor: grab;
      touch-action: pan-y;
    }
    .scene-host:active {
      cursor: grabbing;
    }
    .scene-host :is(canvas) {
      width: 100%;
      height: 100%;
      display: block;
      position: relative;
      z-index: 1;
    }
    .scene-fallback {
      position: absolute;
      inset: 12%;
      display: grid;
      place-items: center;
      transition: opacity 0.6s;
    }
    .scene-fallback img {
      width: 55%;
      height: auto;
      font-size: clamp(80px, 18vw, 210px);
      font-weight: 600;
      letter-spacing: -0.08em;
      color: #e0e1dd;
    }
    .scene-fallback i {
      position: absolute;
      width: 95%;
      height: 58%;
      border: 1px solid #3fd8ff66;
      border-radius: 50%;
      transform: rotate(-40deg);
    }
    .scene-fallback i:last-child {
      transform: rotate(40deg);
    }
    .ready .scene-fallback {
      opacity: 0;
    }
    .fallback {
      cursor: default;
    }
    @media (prefers-reduced-motion: reduce) {
      .scene-fallback {
        transition: none;
      }
    }
  `,
})
export class OrbitalScene implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;
  @Input() paused = false;
  ready = signal(false);
  failed = signal(false);
  private controller?: SceneController;
  private destroyed = false;
  async ngAfterViewInit() {
    try {
      const { createScene } = await import('./three-scene');
      if (this.destroyed) return;
      this.controller = createScene(this.host.nativeElement, this.paused, () => {
        this.ready.set(false);
        this.failed.set(true);
      });
      this.ready.set(true);
    } catch {
      this.failed.set(true);
    }
  }
  ngOnChanges() {
    this.controller?.setPaused(this.paused);
  }
  ngOnDestroy() {
    this.destroyed = true;
    this.controller?.dispose();
  }
}
