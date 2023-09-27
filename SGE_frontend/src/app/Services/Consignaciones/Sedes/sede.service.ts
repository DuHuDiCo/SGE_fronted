import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sede } from 'src/app/Types/Sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http:HttpClient) { }

  url = 'http://192.168.1.183:8006/api/v1'

  getSedes(){
    return this.http.get(`${this.url}/sede/getAllSedes`)
  }

  saveSede(sede:Sede){
    return this.http.post(`${this.url}/sede/saveSede`, sede)
  }

  getSedeById(id:number){
    return this.http.get(`${this.url}/sede/getSedeById/${id}`)
  }

  updateSede(sede:Sede){
    return this.http.put(`${this.url}/sede/editarSede`, sede)
  }

}
