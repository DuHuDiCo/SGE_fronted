import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultarService {

  constructor(private http:HttpClient) { }

  url = 'http://192.168.1.186:8006/api/v1'

  getAllConsignaciones(estado:string){
    return this.http.get(`${this.url}/consignacion/getAllConsignaciones?estado=${estado}`)
  }

}
