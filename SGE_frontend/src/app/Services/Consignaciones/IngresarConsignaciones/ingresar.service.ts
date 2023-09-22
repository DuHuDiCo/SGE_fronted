import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consignacion } from 'src/app/Types/Consignaciones';

@Injectable({
  providedIn: 'root'
})
export class IngresarService {

  constructor(private http:HttpClient) { }

  url = 'http://192.168.1.186:8006/api/v1'
  url2 = 'http://192.168.1.186:8007/api/v1'

  getObligacionByCedula(cedula:string){
    return this.http.get(`${this.url}/cartera/obligacionesByCedula?cedula=${cedula}`)
  }

  saveConsignacion(consignacion:Consignacion){
    return this.http.post(`${this.url2}/consignacion/save`, consignacion)
  }



}