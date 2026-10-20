import { Service } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { inject, signal } from "@angular/core";
import { ActualizarUrlRequest, Url } from "../modelos/URL";
import { tap } from 'rxjs';

@Service()
export class UrlService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/acortador/';

    urls = signal<Url[]>([]);

    cargarUrls() {
        this.http.get<Url[]>(this.apiUrl).subscribe({
            next: (urls) => this.urls.set(urls),
            error: (error) => console.error('Error al obtener los URLs:', error)
        });
    }

    crearUrl(originalUrl: string) {
        return this.http.post<Url>(this.apiUrl, { url: originalUrl }).pipe(
            tap((nueva) => this.urls.update((lista) => [...lista, nueva]))
        );
    }

    actualizarUrl(id: number, actualizacion: ActualizarUrlRequest) {
        return this.http.patch<void>(`${this.apiUrl}${id}/`, actualizacion).pipe(
            tap(() => this.urls.update((lista) =>
                lista.map((url) => url.idUrl === id ? { ...url, titulo: actualizacion.titulo } : url)
            ))
        )
    }

    eliminarUrl(id: number) {
        return this.http.delete(`${this.apiUrl}${id}/`).pipe(
            tap(() => this.urls.update((lista) => lista.filter((u) => u.idUrl !== id)))
        );
    }
}
