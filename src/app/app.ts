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
import { BrandPanel } from './brand-panel';
import { Icon } from './icon';
import { OrbitalScene } from './orbital-scene';
import { EDUCATION, EXPERIENCE, PROJECTS, Project, TRANSLATIONS } from './portfolio.data';

@Component({
  selector: 'app-root',
  imports: [OrbitalScene, Icon, BrandPanel],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('projectDialog') projectDialog?: ElementRef<HTMLDialogElement>;
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
  readonly cv = 'Jasser_Noomani_CV_Fr.pdf';
  readonly year = new Date().getFullYear();
  readonly total = PROJECTS.length.toString().padStart(2, '0');
  readonly visibleProjects = computed(() =>
    this.projects.filter(
      (p) => this.filter() === 'All work' || p.categories.includes(this.filter()),
    ),
  );
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
