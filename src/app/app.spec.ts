import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { App } from './app';
import { TableUrl } from './table-url/table-url';
import { UrlService } from './services/url-service';

describe('App', () => {
  let urlService: UrlService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();

    urlService = TestBed.inject(UrlService);
    vi.spyOn(urlService as any, 'obtenerUrls').mockReturnValue(of([]));
    vi.spyOn(urlService as any, 'crearUrl').mockReturnValue(of([]));
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should toggle the navigation when the mobile menu is clicked', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const menuButton = fixture.nativeElement.querySelector('.menu-mobile') as HTMLButtonElement;
    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;

    expect(nav.classList.contains('open')).toBe(false);
    menuButton.click();
    fixture.detectChanges();
    expect(nav.classList.contains('open')).toBe(true);
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');

    menuButton.click();
    fixture.detectChanges();
    expect(nav.classList.contains('open')).toBe(false);
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('should prevent a page reload and send the URL when the form is submitted', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    fixture.componentInstance.originalUrl.set('https://example.com');
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    const table = fixture.debugElement.query(By.directive(TableUrl)).componentInstance as TableUrl;
    const reloadUrls = vi.spyOn(table as any, 'cargarUrls');
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);

    expect(submitEvent.defaultPrevented).toBe(true);
    expect(urlService.crearUrl).toHaveBeenCalledWith('https://example.com');
    expect(reloadUrls).toHaveBeenCalled();
    expect(fixture.componentInstance.originalUrl()).toBe('');
  });
});
