import { Component, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableUrl } from './table-url/table-url';
import { UrlService } from './services/url-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, RouterOutlet, TableUrl],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  private urlService = inject(UrlService);
  menuOpen = signal(false);
  originalUrl = signal<string>("");
  nuevaUrl = signal<boolean>(false);

  toggleMenu() {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  crearUrl(): void {
    this.urlService.crearUrl(this.originalUrl()).subscribe({
      next: () => this.originalUrl.set(""),
      error: (error) => console.error('Error:', error)
    });
  }
}