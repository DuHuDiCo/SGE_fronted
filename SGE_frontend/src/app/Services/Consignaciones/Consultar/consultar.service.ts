import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consignacion } from 'src/app/Types/Consignaciones';

@Injectable({
  providedIn: 'root'
})
export class ConsultarService {

  constructor(private http:HttpClient) { }

  url = 'http://192.168.1.186:8007/api/v1'

  getAllConsignaciones(estado:string){
    return this.http.get(`${this.url}/consignacion/getAllConsignaciones?estado=${estado}`)
  }

  getConsignacionById(id:number){
    return this.http.get(`${this.url}/consignacion/getConsignacionById/${id}`)
  }

  updateConsignacion(consignacion:Consignacion){
    return this.http.put(`${this.url}/consignacion/editarConsignacion`, consignacion)
  }

}
