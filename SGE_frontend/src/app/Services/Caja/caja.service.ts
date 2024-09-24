import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private http: HttpClient) { }

  getIngresosByFecha(fecha: Date) {
    return this.http.get(`http://192.168.1.241:8009/api/v1/ingresosDiarios/getByFecha?fecha=${fecha}`)
  }

  createCuadreDiario(fechaCuadre: any) {
    return this.http.post(`http://192.168.1.241:8009/api/v1/cuadreDiario/save`, fechaCuadre)
  }

}
