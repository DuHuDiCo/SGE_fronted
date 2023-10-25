import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class ObligacionesService {

  constructor(private http:HttpClient) { }

  url = 'http://192.168.1.241:8006/api/v1/cartera'

  // METODOS ESTADO

  saveEstado(estado:string){
    return this.http.post(`${baseUrl}/cartera/estado/saveEstado`, estado)
  }

  getAllEstado(){
    return this.http.get(`${baseUrl}/cartera/estado/getAllEstados`)
  }

  updateEstado(estado:any){
    return this.http.put(`${baseUrl}/cartera/estado/editarEstado`, estado)
  }

  // METODOS TIPOS

  saveTipo(tipo:string){
    return this.http.post(`${baseUrl}/cartera/tipoCuentaCobrar/save`, tipo)
  }

  getAllTipo(){
    return this.http.get(`${baseUrl}/cartera/tipoCuentaCobrar/allTipoCuentas`)
  }

  updateTipo(tipo:any){
    return this.http.put(`${baseUrl}/cartera/tipoCuentaCobrar/editTipoCuenta`, tipo)
  }

  // METODOS ASESORES

  saveAsesores(asesor:number){
    return this.http.post(`${baseUrl}/asesor/save`, asesor)
  }

  getAllAsesores(){
    return this.http.get(`${baseUrl}/cartera/asesor/allAsesores`)
  }

  getUsuarioByRol(rolId:number){
    return this.http.get(`http://192.168.1.183:8002/api/v1/users/getUserByRol/${rolId}`)
  }

  // METODOS OBLIGACIONES
  saveObligacion(obligacion:any){
    return this.http.post(`${baseUrl}/cartera/cuentasPorCobrar`, obligacion)
  }

  
}
