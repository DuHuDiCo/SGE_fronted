import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from 'src/app/Types/Estado';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class EstadoServiceService {

  constructor(private http:HttpClient) { }

  url = 'http://192.168.1.183:8007/api/v1'

  saveEstado(estado:Estado){
    return this.http.post(`${baseUrl}/consignacion/estado/saveEstado`, estado)
  }

  getAll(){
    return this.http.get(`${baseUrl}/consignacion/estado/getAllEstados`)
  }

  getEstadoById(idEstado:number){
    return this.http.get(`${baseUrl}/consignacion/estado/getEstadoById/${idEstado}`)
  }

  updateEstado(estado:Estado){
    return this.http.put(`${baseUrl}/consignacion/estado/editarEstado`, estado)
  }
}
