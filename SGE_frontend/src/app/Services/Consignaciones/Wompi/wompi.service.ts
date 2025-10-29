import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WompiService {

  private apiUrl = 'http://192.168.1.241:8025/api/v1/wompi';

  constructor(private http: HttpClient) {}

  //  Crear link de pago
  crearLink(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment_links`, datos); 
  }

  // Consultar transacciones
  getTransactions(filtro: any): Observable<any> {
    let params = new HttpParams()
      .set('page', filtro.page)
      .set('size', filtro.size);

    if (filtro.dateInicio) {
      params = params.set('dateInicio', filtro.dateInicio);
    }

    if (filtro.dateFin) {
      params = params.set('dateFin', filtro.dateFin);
    }

    return this.http.get<any>(`${this.apiUrl}/transactions`, { params });
  }

  //   Desactivar link (cuando el usuario lo desactiva manualmente)
  desactivarLink(id: string): Observable<any> {
    const payload = { payment_link_id: id, active: false };
    console.log(' Desactivando link:', payload);
    return this.http.patch(`${this.apiUrl}/payment_links/active`, payload);
  }

  // //   Consultar el estado actual del link
  // estadoLink(id: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/payment_link/${id}`);
  // }
}
