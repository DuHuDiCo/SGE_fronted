import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObligacionesService {

  constructor(private http:HttpClient) { }

  url = 'http://192.168.1.241:8006/api/v1'

  // METODOS ESTADO

  saveEstado(estado:string){
    return this.http.post(`${this.url}/estado/saveEstado`, estado)
  }

  getAllEstado(){
    return this.http.get(`${this.url}/estado/getAllEstados`)
  }

  updateEstado(estado:any){
    return this.http.put(`${this.url}/estado/editarEstado`, estado)
  }

  // METODOS TIPOS

  saveTipo(tipo:string){
    return this.http.post(`${this.url}/tipoCuentaCobrar/save`, tipo)
  }

  getAllTipo(){
    return this.http.get(`${this.url}/tipoCuentaCobrar/allTipoCuentas`)
  }

  updateTipo(tipo:any){
    return this.http.put(`${this.url}/tipoCuentaCobrar/editTipoCuenta`, tipo)
  }

  // METODOS ASESORES

  saveAsesores(asesor:number){
    return this.http.post(`${this.url}/asesor/save`, asesor)
  }

  getAllAsesores(){
    return this.http.get(`${this.url}/asesor/allAsesores`)
  }

  getUsuarioByRol(rolId:number){
    return this.http.get(`http://192.168.1.183:8002/api/v1/users/getUserByRol/${rolId}`)
  }

  // METODOS OBLIGACIONES
  saveObligacion(obligacion:any){
    return this.http.post(`${this.url}/cartera/cuentasPorCobrar`, obligacion)
  }

  
}
