import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('filters projects by their real areas of work and restores all projects', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const filters = fixture.nativeElement.querySelectorAll(
      '.filters button',
    ) as NodeListOf<HTMLButtonElement>;
    const names = () =>
      Array.from(fixture.nativeElement.querySelectorAll('.project-card h3') as NodeListOf<Element>).map(
        (el) => el.textContent?.trim(),
      );
    filters[2].click(); // Mobile
    await fixture.whenStable();
    expect(names()).toEqual(['Nova Paris']);
    filters[3].click(); // Applied AI
    await fixture.whenStable();
    expect(names()).toEqual(['e-Biessa', 'Nirvana', 'Polars & Qdrant']);
    filters[1].click(); // Full-stack
    await fixture.whenStable();
    expect(names()).toHaveLength(4);
    expect(fixture.nativeElement.querySelector('.work-count').textContent).toContain('04 / 06');
    filters[0].click();
    await fixture.whenStable();
    expect(names()).toHaveLength(6);
  });

  it('offers the CV as a download and uses the current contact details', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const cvLinks = fixture.nativeElement.querySelectorAll(
      'a[download]',
    ) as NodeListOf<HTMLAnchorElement>;
    expect(cvLinks.length).toBeGreaterThan(0);
    cvLinks.forEach((a) => expect(a.getAttribute('href')).toBe('Jasser_Noomani_CV_Fr.pdf'));
    expect(fixture.nativeElement.querySelector('a[href^="mailto:"]').getAttribute('href')).toBe(
      'mailto:Jasser.NOOMANI@esprit.tn',
    );
    expect(
      fixture.nativeElement.querySelector('a[aria-label="Jasser Noomani — LinkedIn"]').getAttribute('href'),
    ).toBe('https://www.linkedin.com/in/jasser-noomani');
    expect(fixture.nativeElement.textContent).not.toContain('IELTS');
  });

  it('switches both portfolio content and document language to French', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.nativeElement.querySelector('[aria-label="Français"]').click();
    await fixture.whenStable();
    expect(document.documentElement.lang).toBe('fr');
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Imaginer.');
    expect(fixture.nativeElement.querySelector('.project-description').textContent).toContain(
      'Une marketplace',
    );
    expect(localStorage.getItem('portfolio-language')).toBe('fr');
    fixture.componentInstance.setLanguage('en');
  });

  it('restores a saved language without blocking the content', async () => {
    localStorage.setItem('portfolio-language', 'fr');
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(fixture.componentInstance.lang()).toBe('fr');
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('demain.');
    fixture.componentInstance.setLanguage('en');
  });

  it('shows the selected contribution details and releases scroll lock on dismissal', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    dialog.showModal = vi.fn(() => dialog.setAttribute('open', ''));
    dialog.close = vi.fn(() => {
      dialog.removeAttribute('open');
      dialog.dispatchEvent(new Event('close'));
    });
    fixture.nativeElement.querySelector('[aria-label="Explore Aletheia"]').click();
    await fixture.whenStable();
    expect(dialog.showModal).toHaveBeenCalledOnce();
    expect(dialog.querySelector('h2')?.textContent).toBe('Aletheia');
    expect(dialog.querySelectorAll('.contributions li')).toHaveLength(3);
    expect(document.body.style.overflow).toBe('hidden');
    fixture.componentInstance.closeProject();
    expect(document.body.style.overflow).toBe('');
    expect(fixture.componentInstance.selectedProject()).toBeNull();
  });

  it('closes mobile navigation when a destination is selected or Escape is pressed', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.nativeElement.querySelector('.menu-toggle').click();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.mobile-nav')).not.toBeNull();
    fixture.nativeElement.querySelector('.mobile-nav a').click();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.mobile-nav')).toBeNull();
    fixture.componentInstance.menuOpen.set(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('handles unavailable clipboard access without claiming a successful copy', async () => {
    const fixture = TestBed.createComponent(App);
    const writeText = vi.fn().mockRejectedValue(new Error('Clipboard denied'));
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    await fixture.componentInstance.copyEmail();
    expect(fixture.componentInstance.copied()).toBe(false);
    expect(fixture.componentInstance.copyError()).toBe(true);
    expect(writeText).toHaveBeenCalledWith('Jasser.NOOMANI@esprit.tn');
  });
  it('browses project screenshots in the viewer and wraps around at both ends', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const app = fixture.componentInstance;
    const nova = app.projects.find((p) => p.id === 'nova')!;
    app.selectedProject.set(nova);
    const viewer = fixture.nativeElement.querySelector('.shot-viewer') as HTMLDialogElement;
    viewer.showModal = vi.fn(() => viewer.setAttribute('open', ''));
    app.openShot(0);
    await fixture.whenStable();
    expect(app.currentShot()?.src).toBe(nova.gallery![0].src);
    app.stepShot(-1);
    expect(app.shotIndex()).toBe(nova.gallery!.length - 1);
    app.stepShot(1);
    expect(app.shotIndex()).toBe(0);
    app.onViewerKey(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(app.shotIndex()).toBe(1);
    app.onShotClose();
    expect(app.currentShot()).toBeNull();
  });
  it('shows the e-Biessa demo video and browser-framed screenshots in its details', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const dialog = fixture.nativeElement.querySelector('.project-dialog') as HTMLDialogElement;
    dialog.showModal = vi.fn(() => dialog.setAttribute('open', ''));
    fixture.componentInstance.openProject(fixture.componentInstance.projects[0]);
    await fixture.whenStable();
    const video = dialog.querySelector('video') as HTMLVideoElement;
    expect(video.getAttribute('src')).toBe('projects/ebiessa/demo.mp4');
    expect(video.getAttribute('preload')).toBe('none');
    expect(dialog.querySelector('.gallery.browser')).not.toBeNull();
    expect(dialog.querySelectorAll('.shot-thumb')).toHaveLength(9);
  });
  it('gives Nirvana its narrated demo and ten browser-framed screens', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const nirvana = fixture.componentInstance.projects.find((p) => p.id === 'nirvana')!;
    expect(nirvana.video?.src).toBe('projects/nirvana/demo.mp4');
    expect(nirvana.frame).toBe('browser');
    expect(nirvana.gallery).toHaveLength(10);
  });
  it('shows the About panel facts in the current language', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const facts = () => fixture.nativeElement.querySelector('app-brand-panel .facts').textContent;
    expect(facts()).toContain('Tunis, Tunisia');
    fixture.componentInstance.setLanguage('fr');
    await fixture.whenStable();
    expect(facts()).toContain('Tunis, Tunisie');
    expect(fixture.nativeElement.querySelector('app-brand-panel .clock').textContent).toMatch(/HEURE DE TUNIS · \d\d:\d\d/);
    fixture.componentInstance.setLanguage('en');
  });
});
