import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  url = 'http://192.168.1.241:8030/api/v1'

  constructor(private http: HttpClient) { }

  getParametros() {
    return this.http.get(`${this.url}/parametros/parametros`)
  }

  filtrosGenerales(filtrosGenerales: any) {
    return this.http.post(`${this.url}/filtros/`, filtrosGenerales)
  }
}
