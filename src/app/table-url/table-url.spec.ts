import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { Url } from '../modelos/URL';
import { TableUrl } from './table-url';
import { UrlService } from '../services/url-service';


describe('TableUrl', () => {
  let component: TableUrl;
  let fixture: ComponentFixture<TableUrl>;
  const urls = signal<Url[]>([]);
  const actualizarUrl = vi.fn((id: number, actualizacion: { titulo: string }) => {
    urls.update((lista) => lista.map((url) =>
      url.idUrl === id ? { ...url, titulo: actualizacion.titulo } : url
    ));
    return of(void 0);
  });

  beforeEach(async () => {
    urls.set([]);
    actualizarUrl.mockClear();
    await TestBed.configureTestingModule({
      imports: [TableUrl],
      providers: [
        {
          provide: UrlService,
          useValue: { urls, cargarUrls: vi.fn(), actualizarUrl },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableUrl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a message when there are no URLs', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain("Por el momento no hay url's");
  });

  it('shows the URL information when the table icon is clicked', () => {
    urls.set([{
      idUrl: 1,
      originalUrl: 'https://example.com',
      titulo: 'Example',
      slug: 'example',
      fechaModificacion: '2025-01-01',
      vecesAccedido: 0,
    }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain("Por el momento no hay url's");
    expect(fixture.nativeElement.querySelector('.url-info')).toBeNull();

    fixture.nativeElement.querySelector('.table-icon').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.url-info')).not.toBeNull();
  });


});
