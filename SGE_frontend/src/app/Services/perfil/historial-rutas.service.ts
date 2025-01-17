import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HistorialRutasService {
  private rutas: string[] = []; // Inicializa un array vacío donde se almacenarán las rutas visitadas.

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Cuando ocurre un evento de tipo NavigationEnd (finalización de una navegación), se agrega la ruta visitada al array 'rutas'.
        this.rutas.push(event.urlAfterRedirects); // Almacena la ruta visitada (después de redireccionamientos, si los hay).
      }
    });
  }

  // Método que devuelve la última ruta visitada (excepto la actual).
  obtenerUltimaRuta(): string | null {
    // Si el historial tiene más de una ruta registrada, devuelve la antepenúltima. Si no hay suficientes rutas (o está vacío), devuelve null.
    return this.rutas.length > 1 ? this.rutas[this.rutas.length - 3] : null;
  }
}
