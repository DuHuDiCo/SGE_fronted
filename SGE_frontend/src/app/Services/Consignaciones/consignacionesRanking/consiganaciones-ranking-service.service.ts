import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Types/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ConsiganacionesRankingService {

  constructor(private http: HttpClient) { }

  url = 'http://192.168.1.183:8007/api/v1'

  // url = 'http://192.168.1.183:8007/api/v1'

  getEstadisticas(username:string){
    return this.http.get(`${this.url}/consignacion/getEstadisticas?username=${username}`)
   
  }

}