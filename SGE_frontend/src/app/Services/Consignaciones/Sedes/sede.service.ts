import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sede } from 'src/app/Types/Sede';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http:HttpClient) { }

  url = 'http://192.168.1.241:8006/api/v1'

  getSedes(){
    return this.http.get(`${baseUrl}/cartera/sede/getAllSedes`)
  }

  saveSede(sede:Sede){
    return this.http.post(`${baseUrl}/cartera/sede/saveSede`, sede)
  }

  getSedeById(id:number){
    return this.http.get(`${baseUrl}/cartera/sede/getSedeById/${id}`)
  }

  updateSede(sede:Sede){
    return this.http.put(`${baseUrl}/cartera/sede/editarSede`, sede)
  }

}
