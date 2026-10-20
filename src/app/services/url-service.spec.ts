import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UrlService } from './url-service';
import { TableUrl } from '../table-url/table-url';
import { signal } from '@angular/core';
import { Url } from '../modelos/URL';
import { of } from 'rxjs';


describe('UrlService', () => {
  let service: UrlService;
  let fixture: ComponentFixture<TableUrl>;
  let component: TableUrl;
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

  it('sends the edited title for the selected URL and updates the list', () => {
    urls.set([{
      idUrl: 1,
      originalUrl: 'https://example.com',
      titulo: 'Example',
      slug: 'example',
      fechaModificacion: '2025-01-01',
      vecesAccedido: 0,
    }]);

    fixture.detectChanges();
    fixture.nativeElement.querySelector('.table-icon').click();
    fixture.detectChanges();

    const titleInput = fixture.nativeElement.querySelector('.url-info input') as HTMLInputElement;
    titleInput.value = 'Updated title';
    titleInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.btn-guardar').click();
    fixture.detectChanges();

    expect(actualizarUrl).toHaveBeenCalledWith(1, {
      url: 'https://example.com',
      titulo: 'Updated title',
      cambiarSlug: false,
      esClicked: false,
    });
    expect(urls()[0].titulo).toBe('Updated title');
    expect(fixture.nativeElement.querySelector('.url-info input').value).toBe('Updated title');
  });
});
