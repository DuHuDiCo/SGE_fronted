import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root',
})
export class VendedorService {
  constructor(private httClient: HttpClient) {}

  public añadirVendedor(vendedor: { nombreVendedor: string; idZona: number }) {
    if (vendedor.nombreVendedor == '' || vendedor.nombreVendedor == null) {
      console.log('Error');
      return this.httClient.post(`${baseUrl}/vendedor`, vendedor);
    } else {
      console.log(vendedor);
      return;
    }
  }
}
