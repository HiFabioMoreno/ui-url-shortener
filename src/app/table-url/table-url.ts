import { Component, inject, OnInit } from '@angular/core';
import { Url } from '../modelos/URL';
import { UrlService } from '../services/url-service';

@Component({
  imports: [],
  selector: 'app-table-url',
  styleUrl: './table-url.css',
  templateUrl: './table-url.html',
})
export class TableUrl implements OnInit {

  private urlService = inject(UrlService);

  urls = this.urlService.urls;

  urlSeleccionada: Url | null = null;
  tituloEditado = '';

  isUrlInfoVisible = false;

  ngOnInit(): void {
    this.urlService.cargarUrls();
  }

  showUrlInfo(url: Url): void {
    this.urlSeleccionada = url;
    this.tituloEditado = url.titulo;
    this.isUrlInfoVisible = true;
  }

  actualizarTitulo(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.tituloEditado = event.target.value;
    }
  }

  actualizarTituloUrl(): void {
    if (!this.urlSeleccionada) {
      return;
    }

    const url = this.urlSeleccionada;
    this.urlService.actualizarUrl(url.idUrl, {
      url: url.originalUrl,
      titulo: this.tituloEditado,
      cambiarSlug: false,
      esClicked: false,
    }).subscribe({
      next: () => {
        if (this.urlSeleccionada?.idUrl === url.idUrl) {
          this.urlSeleccionada = { ...this.urlSeleccionada, titulo: this.tituloEditado };
        }
      },
      error: (error) => console.error('Error al actualizar el URL:', error)
    });
  }

  closeUrlInfo(): void {
    this.isUrlInfoVisible = false;
    this.urlSeleccionada = null;
  }
  eliminarUrl(url: Url): void {
    this.urlService.eliminarUrl(url.idUrl).subscribe({
      next: () => this.closeUrlInfo(),
      error: (error) => console.error('Error al eliminar el URL:', error)
    });
  }

}