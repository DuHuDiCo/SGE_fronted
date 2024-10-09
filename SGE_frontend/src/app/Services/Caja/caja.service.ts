import { HttpClient } from '@angular/common/http';
import { r3JitTypeSourceSpan } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngresosDiariosArray } from 'src/app/Types/Caja/CuadreDiario';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private http: HttpClient) { }

//Ingresos diarios
  getIngresosByFecha(fecha: string) {
    return this.http.get(`${baseUrl}/ingresosDiarios/getByFecha?fecha=${fecha}`);
  }

  createIngresosDiarios(ingresoDiario: IngresosDiariosArray) {
    return this.http.post(`${baseUrl}/ingresosDiarios/save`, ingresoDiario);
  }
  
  updateIngresosDiarios(ingresosDiarios: IngresosDiariosArray, idIngreso: number){
    return this.http.put(`${baseUrl}/ingresosDiarios/update?idIngreso=${idIngreso}`, ingresosDiarios);
  }

  deleteIngresosDiarios(idIngreso: number){
    return this.http.delete(`${baseUrl}/ingresosDiarios/delete/${idIngreso}`);
  }

  //Tipos de ingresos
  getTiposDeIngresos(){
    return this.http.get(`${baseUrl}/tipoIngresos/`);
  }

  createTipoDeIngreso(tipoIngreso: any){
    return this.http.post(`${baseUrl}/tipoIngresos/saveTipoIngreso`, tipoIngreso);
  }

// Métodos de servicio
getCuadreDiario(fechaInicial: string, fechaFinal: string): Observable<any[]> {
  return this.http.get<any[]>(`${baseUrl}/cuadreDiario/getByMes?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`);
}

createCuadreDiario(obj: { fechaCuadre: Date }) {
  return this.http.post(`${baseUrl}/cuadreDiario/save`, obj);
}

createCuadreMensual(obj: { fecha: string }) {
  return this.http.post(`${baseUrl}/cuadreMensual/save`, obj);
}

getCuadreMensual(fecha: string) {
  return this.http.get(`${baseUrl}/cuadreMensual/getByMes?fecha=${fecha}`);
}
}
