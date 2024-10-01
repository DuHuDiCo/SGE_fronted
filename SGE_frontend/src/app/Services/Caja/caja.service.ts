import { HttpClient } from '@angular/common/http';
import { r3JitTypeSourceSpan } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngresosDiariosArray } from 'src/app/Types/Caja/CuadreDiario';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private http: HttpClient) { }

  getIngresosByFecha(fecha: string) {
    return this.http.get(`http://192.168.1.241:8009/api/v1/ingresosDiarios/getByFecha?fecha=${fecha}`)
  }

  createIngresosDiarios(ingresoDiario: IngresosDiariosArray) {
    return this.http.post('http://192.168.1.241:8009/api/v1/ingresosDiarios/save', ingresoDiario);
  }
  
  updateIngresosDiarios(ingresosDiarios: IngresosDiariosArray, idIngreso: number){
    return this.http.put(`http://192.168.1.241:8009/api/v1/ingresosDiarios/update?idIngreso=${idIngreso}`, ingresosDiarios);
  }

  deleteIngresosDiarios(idIngreso: number){
    return this.http.delete(`http://192.168.1.241:8009/api/v1/ingresosDiarios/delete/${idIngreso}`)
  }

  createCuadreDiario(fechaCuadre: Date) {
    return this.http.post(`http://192.168.1.241:8009/api/v1/cuadreDiario/save`, fechaCuadre)
  }

  getTiposDeIngresos(){
    return this.http.get(`http://192.168.1.241:8009/api/v1/tipoIngresos/`);
  }

  createTipoDeIngreso(tipoIngreso: any){
    return this.http.post(`http://192.168.1.241:8009/api/v1/tipoIngresos/saveTipoIngreso`, tipoIngreso);
  }

}
