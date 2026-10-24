import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';

export interface CardStat {
  label: string;
  value: string;
  fill: number; // 0–100, bar length (decorative)
}

/**
 * Tilting "engineer profile" card for the hero.
 * Shows `photo` in a blue duotone; falls back to the JN monogram if the file is missing.
 */
@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.html',
  styleUrl: './player-card.css',
  host: {
    '[class.still]': 'paused',
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'reset()',
  },
})
export class PlayerCard {
  @ViewChild('card', { static: true }) card!: ElementRef<HTMLElement>;
  @Input() paused = false;
  @Input() photo = 'photo.jpg';
  @Input() heading = 'ENGINEER PROFILE';
  @Input() name = 'Jasser Noomani';
  @Input() role = 'FULL-STACK · MOBILE · AI';
  @Input() yearLabel = 'YEAR';
  @Input() yearNote = 'FINAL';
  @Input() stats: CardStat[] = [];
  readonly photoFailed = signal(false);

  onMove(event: PointerEvent) {
    if (this.paused || event.pointerType === 'touch') return;
    const rect = this.card.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const style = this.card.nativeElement.style;
    style.setProperty('--ry', `${(x * 22).toFixed(2)}deg`);
    style.setProperty('--rx', `${(-y * 16).toFixed(2)}deg`);
    style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
    style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
    this.card.nativeElement.classList.add('tilting');
  }

  reset() {
    const style = this.card.nativeElement.style;
    ['--ry', '--rx', '--mx', '--my'].forEach((p) => style.removeProperty(p));
    this.card.nativeElement.classList.remove('tilting');
  }
}
