import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [FormsModule, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  menuOpen = signal(false);
  originalUrl = '';

  toggleMenu() {
    this.menuOpen.update((isOpen) => !isOpen);
  }
}
