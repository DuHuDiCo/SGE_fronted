import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from 'src/app/Types/Estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoServiceService {

  constructor(private http:HttpClient) { }

  url = 'http://192.168.1.186:8007/api/v1'

  saveEstado(estado:Estado){
    return this.http.post(`${this.url}/estado/saveEstado`, estado)
  }

  getAll(){
    return this.http.get(`${this.url}/estado/getAllEstados`)
  }
}
