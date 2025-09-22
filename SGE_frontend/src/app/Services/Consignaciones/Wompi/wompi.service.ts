import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WompiService {
  private apiUrl = 'http://192.168.1.241:8025/api/v1/wompi';

  constructor(private http: HttpClient) {}

  crearLink(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment_links`, datos); 
  }

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
}

  // desactivarLink(link: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl} `, { link }); //falta ver como se llaman en el backend 
  // }

  // estadoLink(link: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}${link}`); //no estoy seguro si esta en el backend 
  // }


