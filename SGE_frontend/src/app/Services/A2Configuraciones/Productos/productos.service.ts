import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private httClient: HttpClient) {}

  public añadirProducto(producto: { nombreProducto: string; descripcion: string; codigo: string; idCategoriaProducto: number }) {
    if (producto.nombreProducto == '' || producto.nombreProducto == null) {
      console.log('Error');
      return this.httClient.post(`${baseUrl}/vendedor`, producto);
    } else {
      console.log(producto);
      return;
    }
  }
}
