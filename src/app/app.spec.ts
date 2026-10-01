import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
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

});
