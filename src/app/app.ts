import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { BrandPanel, PanelFact } from './brand-panel';
import { Icon } from './icon';
import { CardStat, PlayerCard } from './player-card';
import { EDUCATION, EXPERIENCE, PROJECTS, Project, Shot, TRANSLATIONS } from './portfolio.data';

@Component({
  selector: 'app-root',
  imports: [PlayerCard, Icon, BrandPanel],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('projectDialog') projectDialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('shotViewer') shotViewer?: ElementRef<HTMLDialogElement>;
  readonly projects = PROJECTS;
  readonly experience = EXPERIENCE;
  readonly education = EDUCATION;
  readonly filters = ['All work', 'Full-stack', 'Mobile', 'Applied AI', 'Data & DevOps'];
  readonly filter = signal('All work');
  readonly menuOpen = signal(false);
  readonly selectedProject = signal<Project | null>(null);
  readonly copied = signal(false);
  readonly copyError = signal(false);
  readonly lang = signal<'en' | 'fr'>('en');
  readonly reducedMotion = signal(
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  readonly email = 'Jasser.NOOMANI@esprit.tn';
  readonly github = 'https://github.com/jassernoomani';
  readonly linkedin = 'https://www.linkedin.com/in/jasser-noomani';
  /** CV file that matches the selected language. */
  get cv() {
    return this.lang() === 'fr' ? 'Jasser_Noomani_CV_Fr.pdf' : 'Jasser_Noomani_CV_En.pdf';
  }
  readonly year = new Date().getFullYear();
  readonly total = PROJECTS.length.toString().padStart(2, '0');
  readonly visibleProjects = computed(() =>
    this.projects.filter(
      (p) => this.filter() === 'All work' || p.categories.includes(this.filter()),
    ),
  );
  readonly cardStats = computed<CardStat[]>(() => {
    this.lang();
    return [
      { label: this.t('Projects'), value: '06', fill: 60 },
      { label: this.t('Internships'), value: '02', fill: 40 },
      { label: this.t('Auto tests'), value: '240+', fill: 92 },
      { label: this.t('Languages'), value: '03', fill: 55 },
    ];
  });
  readonly aboutFacts = computed<PanelFact[]>(() => {
    this.lang();
    return [
      { label: this.t('Based in'), value: this.t('Tunis, Tunisia') },
      { label: this.t('Main stack'), value: 'Java · Angular · Flutter' },
      { label: this.t('Focus'), value: this.t('Full-stack · Mobile · AI') },
    ];
  });
  readonly shotIndex = signal(0);
  readonly viewerOpen = signal(false);
  readonly shots = computed<Shot[]>(() => this.selectedProject()?.gallery ?? []);
  readonly currentShot = computed(() => (this.viewerOpen() ? this.shots()[this.shotIndex()] : null));
  readonly zoomed = signal(false);
  readonly zoomX = signal(50);
  readonly zoomY = signal(50);
  private swipeX: number | null = null;
  private lastTap = 0;
  private copyTimer?: ReturnType<typeof setTimeout>;
  private lastFocus?: HTMLElement;

  t(text: string) {
    return this.lang() === 'fr' ? (TRANSLATIONS[text] ?? text) : text;
  }
  pad(n: number) {
    return n.toString().padStart(2, '0');
  }
  ngAfterViewInit() {
    try {
      if (localStorage.getItem('portfolio-language') === 'fr') this.setLanguage('fr');
    } catch {
      /* Storage is optional. */
    }
  }
  setLanguage(lang: 'en' | 'fr') {
    this.lang.set(lang);
    document.documentElement.lang = lang;
    document.title =
      lang === 'fr'
        ? 'Jasser Noomani — Élève ingénieur en informatique'
        : 'Jasser Noomani — Software Engineering Student';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        this.t(
          'Software engineering student in Tunis. Full-stack, mobile and applied AI. Discover e-Biessa, Nova Paris, Nirvana and more.',
        ),
      );
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', 'Jasser Noomani — ' + this.t('Engineering what’s next.'));
    try {
      localStorage.setItem('portfolio-language', lang);
    } catch {
      /* Storage is optional. */
    }
  }
  navigate() {
    this.menuOpen.set(false);
  }
  openProject(project: Project) {
    this.lastFocus = document.activeElement as HTMLElement;
    this.selectedProject.set(project);
    this.projectDialog?.nativeElement.showModal();
    document.body.style.overflow = 'hidden';
  }
  closeProject() {
    this.projectDialog?.nativeElement.close();
  }
  onDialogClose() {
    document.body.style.overflow = '';
    this.selectedProject.set(null);
    this.lastFocus?.focus();
  }
  openShot(index: number) {
    this.shotIndex.set(index);
    this.zoomed.set(false);
    this.viewerOpen.set(true);
    this.shotViewer?.nativeElement.showModal();
  }
  closeShot() {
    this.shotViewer?.nativeElement.close();
  }
  onShotClose() {
    this.viewerOpen.set(false);
    this.zoomed.set(false);
  }
  /** Shortest signed distance from the current screen, so the carousel wraps smoothly. */
  offset(i: number) {
    const n = this.shots().length;
    const half = Math.floor(n / 2);
    return ((((i - this.shotIndex()) % n) + n + half) % n) - half;
  }
  goShot(index: number) {
    this.zoomed.set(false);
    this.shotIndex.set(index);
  }
  stepShot(delta: number) {
    const n = this.shots().length;
    if (n) this.goShot((this.shotIndex() + delta + n) % n);
  }
  toggleZoom(x = 50, y = 50) {
    if (!this.zoomed()) {
      this.zoomX.set(x);
      this.zoomY.set(y);
    }
    this.zoomed.set(!this.zoomed());
  }
  private zoomPoint(event: PointerEvent) {
    const r = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const clamp = (v: number) => Math.min(100, Math.max(0, v));
    return [clamp(((event.clientX - r.left) / r.width) * 100), clamp(((event.clientY - r.top) / r.height) * 100)];
  }
  onZoomDown(event: PointerEvent) {
    const [x, y] = this.zoomPoint(event);
    if (event.pointerType === 'mouse') {
      if (event.button === 0) this.toggleZoom(x, y);
      return;
    }
    const now = Date.now();
    if (now - this.lastTap < 320) this.toggleZoom(x, y);
    this.lastTap = now;
  }
  onZoomMove(event: PointerEvent) {
    if (!this.zoomed()) return;
    const [x, y] = this.zoomPoint(event);
    this.zoomX.set(x);
    this.zoomY.set(y);
  }
  onViewerKey(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') this.stepShot(1);
    else if (event.key === 'ArrowLeft') this.stepShot(-1);
    else if (event.key === '+' || event.key === '=') this.zoomed.set(true);
    else if (event.key === '-') this.zoomed.set(false);
    else return;
    event.preventDefault();
  }
  onViewerCancel(event: Event) {
    if (this.zoomed()) {
      event.preventDefault();
      this.zoomed.set(false);
    }
  }
  onViewerClick(event: MouseEvent) {
    const el = event.target as HTMLElement;
    if (el === this.shotViewer?.nativeElement || el.classList.contains('viewer-stage') || el.classList.contains('viewer-track'))
      this.closeShot();
  }
  onSwipeStart(event: PointerEvent) {
    this.swipeX = event.pointerType === 'mouse' || this.zoomed() ? null : event.clientX;
  }
  onSwipeEnd(event: PointerEvent) {
    if (this.swipeX === null) return;
    const dx = event.clientX - this.swipeX;
    this.swipeX = null;
    if (Math.abs(dx) > 40) this.stepShot(dx < 0 ? 1 : -1);
  }
  scrollStrip(strip: HTMLElement, direction: number) {
    strip.scrollBy({ left: direction * strip.clientWidth * 0.8, behavior: 'smooth' });
  }
  closeOnBackdrop(event: MouseEvent) {
    if (event.target === this.projectDialog?.nativeElement) this.closeProject();
  }
  async copyEmail() {
    try {
      await navigator.clipboard.writeText(this.email);
      this.copied.set(true);
      this.copyError.set(false);
      clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied.set(false), 2500);
    } catch {
      this.copyError.set(true);
    }
  }
  @HostListener('document:keydown.escape') onEscape() {
    this.menuOpen.set(false);
  }
  ngOnDestroy() {
    clearTimeout(this.copyTimer);
    document.body.style.overflow = '';
  }
}
